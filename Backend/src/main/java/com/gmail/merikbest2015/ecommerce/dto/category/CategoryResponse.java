package com.gmail.merikbest2015.ecommerce.dto.category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private Integer sortOrder;
}
