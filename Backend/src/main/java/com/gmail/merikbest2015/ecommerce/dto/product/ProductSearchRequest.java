package com.gmail.merikbest2015.ecommerce.dto.product;

import lombok.Data;

import java.util.List;

/**
 * DTO chứa bộ lọc tìm kiếm sản phẩm từ frontend.
 */
@Data
public class ProductSearchRequest {
    private List<String> vendors;
    private List<String> genders;
    private List<String> categories;
    private List<Integer> prices;     // [minPrice, maxPrice]
    private Boolean sortByPrice;

    private String gender;

    private String vendor;
    private String category;
}
