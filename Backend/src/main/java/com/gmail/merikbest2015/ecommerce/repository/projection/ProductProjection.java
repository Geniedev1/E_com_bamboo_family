package com.gmail.merikbest2015.ecommerce.repository.projection;

import org.springframework.beans.factory.annotation.Value;

/**
 * Projection interface cho Product - dùng trong danh sách sản phẩm
 * (không lấy toàn bộ object, chỉ lấy fields cần hiển thị).
 */
public interface ProductProjection {
    Long getId();
    String getProductTitle();
    String getVendor();
    Integer getPrice();
    String getFilename();
    Double getProductRating();
    String getVolume();
    String getProductStatus();
    Integer getStockQuantity();

    @Value("#{target.category != null ? target.category.name : null}")
    String getCategory();

    @Value("#{target.reviews.size()}")
    Integer getReviewsCount();
}
