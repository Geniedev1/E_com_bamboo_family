package com.gmail.merikbest2015.ecommerce.dto.chat;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class CustomerMessageRequest {

    @NotBlank
    private String token;   // UUID do client sinh, định danh hội thoại

    private String name;    // tên khách (nếu đăng nhập/khai báo)
    private String email;

    @NotBlank
    @Length(max = 2000)
    private String content;
}
