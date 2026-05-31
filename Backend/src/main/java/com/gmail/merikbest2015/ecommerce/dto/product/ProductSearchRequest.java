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

    // Giữ backward compat (frontend cũ gọi perfumers/perfumeGender)
    private List<String> perfumers;
    private String perfumeGender;
    private String perfumer;

    // Getter thống nhất: ưu tiên vendors mới, fallback sang perfumers cũ
    public List<String> getVendors() {
        return (vendors != null && !vendors.isEmpty()) ? vendors : perfumers;
    }

    public String getVendor() {
        return vendor != null ? vendor : perfumer;
    }

    private String vendor;
    private String category;
}
