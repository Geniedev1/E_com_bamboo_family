package com.gmail.merikbest2015.ecommerce.dto.product;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO rút gọn dùng cho danh sách sản phẩm (card view).
 */
@Getter
@Setter
public class ProductResponse {
    private Long id;
    private String productTitle;
    private String vendor;
    private Integer price;
    private Double productRating;
    private String filename;
    private Integer reviewsCount;
    private String volume;
    private String category;
    private String productStatus;
    private Integer stockQuantity;
}
