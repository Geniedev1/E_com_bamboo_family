package com.gmail.merikbest2015.ecommerce.dto.product;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO đầy đủ dùng cho trang chi tiết sản phẩm và admin edit.
 */
@Getter
@Setter
public class FullProductResponse extends ProductResponse {
    private Integer year;
    private String country;
    private String gender;
    private String topDescription;
    private String middleDescription;
    private String baseDescription;
    private String description;
    private String type;
    private List<String> images; // Danh sách ảnh (tối đa 5), images[0] = ảnh bìa
}
