package com.gmail.merikbest2015.ecommerce.dto.category;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.FILL_IN_THE_INPUT_FIELD;

@Data
public class CategoryRequest {

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String name;

    @Length(max = 500)
    private String description;

    private Integer sortOrder;
}
