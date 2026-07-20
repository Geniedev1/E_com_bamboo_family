package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.HeaderResponse;
import com.gmail.merikbest2015.ecommerce.dto.product.FullProductResponse;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductResponse;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.dto.product.SearchTypeRequest;
import com.gmail.merikbest2015.ecommerce.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;

/**
 * REST Controller cho sản phẩm (Product).
 * Endpoint: /api/v1/products
 */
@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_PRODUCTS)
public class ProductController {

    private final ProductMapper productMapper;

    // ===== GET: Danh sách sản phẩm (phân trang) =====
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.getAllProducts(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    // ===== GET: Chi tiết sản phẩm =====
    @GetMapping(PRODUCT_ID)
    public ResponseEntity<FullProductResponse> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productMapper.getProductById(productId));
    }

    // ===== POST: Lấy nhiều sản phẩm theo IDs (giỏ hàng) =====
    @PostMapping(IDS)
    public ResponseEntity<List<ProductResponse>> getProductsByIds(@RequestBody List<Long> productIds) {
        return ResponseEntity.ok(productMapper.getProductsByIds(productIds));
    }

    // ===== POST: Tìm kiếm với bộ lọc =====
    @PostMapping(SEARCH)
    public ResponseEntity<List<ProductResponse>> findProductsByFilterParams(
            @RequestBody ProductSearchRequest filter,
            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findProductsByFilterParams(filter, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    // ===== POST: Tìm theo gender/target audience =====
    @PostMapping(SEARCH_GENDER)
    public ResponseEntity<List<ProductResponse>> findByGender(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByGender(filter.getGenders() != null && !filter.getGenders().isEmpty()
                ? filter.getGenders().get(0) : filter.getGender()));
    }

    // ===== POST: Tìm theo vendor/thương hiệu =====
    @PostMapping(SEARCH_VENDOR)
    public ResponseEntity<List<ProductResponse>> findByVendor(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByVendor(filter.getVendor()));
    }

    // ===== POST: Tìm theo category =====
    @PostMapping(SEARCH_CATEGORY)
    public ResponseEntity<List<ProductResponse>> findByCategory(
            @RequestBody ProductSearchRequest filter,
            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findByCategory(filter.getCategory(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    // ===== POST: Full-text search (thanh tìm kiếm) =====
    @PostMapping(SEARCH_TEXT)
    public ResponseEntity<List<ProductResponse>> findByInputText(
            @RequestBody SearchTypeRequest searchType,
            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findByInputText(
                searchType.getSearchType(), searchType.getText(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
