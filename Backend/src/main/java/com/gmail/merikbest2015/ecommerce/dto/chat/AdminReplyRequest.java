package com.gmail.merikbest2015.ecommerce.dto.chat;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class AdminReplyRequest {

    @NotBlank
    @Length(max = 2000)
    private String content;
}
