package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.OrderItem;
import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.enums.OrderStatus;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.repository.OrderItemRepository;
import com.gmail.merikbest2015.ecommerce.repository.OrderRepository;
import com.gmail.merikbest2015.ecommerce.repository.ProductRepository;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.email.MailSender;

import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.ORDER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final MailSender mailSender;

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        Order order = getOrderById(orderId);
        return order.getOrderItems();
    }

    @Override
    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public Page<Order> getUserOrders(String email, Pageable pageable) {
        return orderRepository.findOrderByEmail(email, pageable);
    }

    @Override
    @Transactional
    public Order postOrder(Order order, Map<Long, Long> perfumesId) {
        List<OrderItem> orderItemList = new ArrayList<>();
        double serverTotal = 0.0;

        for (Map.Entry<Long, Long> entry : perfumesId.entrySet()) {
            Product product = productRepository.findById(entry.getKey()).get();
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            long itemAmount = (long) product.getPrice() * entry.getValue();
            orderItem.setAmount(itemAmount);
            orderItem.setQuantity(entry.getValue());
            serverTotal += itemAmount;
            orderItemList.add(orderItem);
            orderItemRepository.save(orderItem);
        }
        // Always recalculate total on the server — never trust frontend price
        order.setTotalPrice(serverTotal);
        order.setOrderStatus(OrderStatus.PENDING);
        order.getOrderItems().addAll(orderItemList);
        orderRepository.save(order);

        String subject = "Đơn hàng #" + order.getId() + " đã được đặt thành công";
        String template = "order-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);
        mailSender.sendMessageHtml(order.getEmail(), subject, template, attributes);
        return order;
    }

    @Override
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));

        OrderStatus oldStatus = order.getOrderStatus();
        order.setOrderStatus(newStatus);
        orderRepository.save(order);

        // Send email notification to customer
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);

        if (newStatus == OrderStatus.CONFIRMED && oldStatus == OrderStatus.PENDING) {
            String subject = "Đơn hàng #" + order.getId() + " đã được xác nhận";
            mailSender.sendMessageHtml(order.getEmail(), subject, "order-confirmed-template", attributes);
        } else if (newStatus == OrderStatus.CANCELED) {
            String subject = "Đơn hàng #" + order.getId() + " đã bị hủy";
            mailSender.sendMessageHtml(order.getEmail(), subject, "order-canceled-template", attributes);
        }

        return order;
    }

    @Override
    @Transactional
    public String deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));
        orderRepository.delete(order);
        return "Order deleted successfully";
    }

    @Override
    public DataFetcher<List<Order>> getAllOrdersByQuery() {
        return dataFetchingEnvironment -> orderRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Order>> getUserOrdersByEmailQuery() {
        return dataFetchingEnvironment -> {
            String email = dataFetchingEnvironment.getArgument("email").toString();
            return orderRepository.findOrderByEmail(email);
        };
    }
}

