package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchProduct;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.repository.ProductRepository;
import com.gmail.merikbest2015.ecommerce.repository.projection.ProductProjection;
import com.gmail.merikbest2015.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.PRODUCT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    private static final int MAX_IMAGES = 5;

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ApiRequestException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<ProductProjection> getAllProducts(Pageable pageable) {
        return productRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public List<ProductProjection> getProductsByIds(List<Long> productIds) {
        return productRepository.getProductsByIds(productIds);
    }

    @Override
    public Page<ProductProjection> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable) {
        return productRepository.findProductsByFilterParams(
                filter.getVendors(),
                filter.getGenders(),
                filter.getCategories(),
                filter.getPrices() != null ? filter.getPrices().get(0) : null,
                filter.getPrices() != null ? filter.getPrices().get(1) : null,
                filter.getSortByPrice() != null && filter.getSortByPrice(),
                pageable);
    }

    @Override
    public List<Product> findByVendor(String vendor) {
        return productRepository.findByVendorOrderByPriceDesc(vendor);
    }

    @Override
    public List<Product> findByGender(String gender) {
        return productRepository.findByGenderOrderByPriceDesc(gender);
    }

    @Override
    public Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable) {
        switch (searchType) {
            case BRAND:
                return productRepository.findByVendor(text, pageable);
            case PRODUCT_TITLE:
                return productRepository.findByProductTitle(text, pageable);
            case COUNTRY:
                return productRepository.findByCountry(text, pageable);
            default:
                return productRepository.findByProductTitle(text, pageable);
        }
    }

    @Override
    public Page<ProductProjection> findByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    @Override
    @Transactional
    public Product saveProduct(Product product, MultipartFile[] multipartFiles) {
        Product existing = product.getId() != null
                ? productRepository.findById(product.getId()).orElse(null)
                : null;

        List<String> imageUrls = new ArrayList<>();
        if (multipartFiles != null) {
            for (MultipartFile file : multipartFiles) {
                if (file == null || file.isEmpty()) {
                    continue;
                }
                if (imageUrls.size() >= MAX_IMAGES) {
                    break; // giới hạn tối đa 5 ảnh / sản phẩm
                }
                imageUrls.add(storeImage(file));
            }
        }

        if (!imageUrls.isEmpty()) {
            product.setImages(imageUrls);
            product.setFilename(imageUrls.get(0)); // ảnh bìa
        } else if (existing != null) {
            // Chỉnh sửa mà không upload ảnh mới -> giữ nguyên ảnh cũ.
            product.setImages(existing.getImages());
            product.setFilename(existing.getFilename());
        } else {
            // Sản phẩm mới không có ảnh -> dùng ảnh mặc định.
            String placeholder = baseUrl + "/static/images/empty.jpg";
            product.setFilename(placeholder);
            product.setImages(Collections.singletonList(placeholder));
        }

        // Chỉnh sửa mà không đổi danh mục -> giữ danh mục cũ.
        if (product.getCategory() == null && existing != null) {
            product.setCategory(existing.getCategory());
        }
        return productRepository.save(product);
    }

    private String storeImage(MultipartFile multipartFile) {
        String fileName = UUID.randomUUID().toString() + "." + multipartFile.getOriginalFilename();
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }
        File file = new File(uploadDirectory, fileName);
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        } catch (IOException e) {
            throw new ApiRequestException("Failed to store uploaded file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return baseUrl + "/images/" + fileName;
    }

    @Override
    @Transactional
    public String deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiRequestException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND));
        productRepository.delete(product);
        return "Product deleted successfully";
    }
}
