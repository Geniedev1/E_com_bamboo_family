package com.gmail.merikbest2015.ecommerce.dto.product;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.FILL_IN_THE_INPUT_FIELD;

/**
 * DTO nhận dữ liệu từ form thêm/sửa sản phẩm (admin).
 */
@Data
public class ProductRequest {

    private Long id;
    private String filename;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String productTitle; // Tên sản phẩm

    @Length(max = 255)
    private String vendor; // Thương hiệu / nghệ nhân / nhà sản xuất

    private Integer year; // Năm sản xuất (không bắt buộc)

    @Length(max = 255)
    private String country; // Xuất xứ

    @Length(max = 255)
    private String gender; // Target audience (nam/nữ/unisex/trẻ em...)

    @Length(max = 255)
    private String topDescription; // Mô tả ngắn 1

    @Length(max = 255)
    private String middleDescription; // Mô tả ngắn 2

    @Length(max = 255)
    private String baseDescription; // Mô tả ngắn 3

    @Length(max = 2000)
    private String description; // Mô tả đầy đủ

    @NotNull(message = FILL_IN_THE_INPUT_FIELD)
    private Integer price; // Giá (VND)

    @Length(max = 255)
    private String volume; // Kích thước / size

    @Length(max = 255)
    private String type; // Phân loại nội bộ

    private Integer stockQuantity; // Số lượng tồn kho

    private Long categoryId; // Danh mục (tham chiếu category.id)

    @Length(max = 50)
    private String productStatus; // ACTIVE | INACTIVE | OUT_OF_STOCK
}
