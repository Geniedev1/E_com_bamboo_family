package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchProduct;
import com.gmail.merikbest2015.ecommerce.repository.projection.ProductProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Product getProductById(Long productId);

    Page<ProductProjection> getAllProducts(Pageable pageable);

    List<ProductProjection> getProductsByIds(List<Long> productIds);

    Page<ProductProjection> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable);

    List<Product> findByVendor(String vendor);

    List<Product> findByGender(String gender);

    Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable);

    Page<ProductProjection> findByCategory(String category, Pageable pageable);

    Product saveProduct(Product product, MultipartFile[] files);

    String deleteProduct(Long productId);
}
