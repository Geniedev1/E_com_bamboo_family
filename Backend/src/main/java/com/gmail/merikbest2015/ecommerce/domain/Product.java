package com.gmail.merikbest2015.ecommerce.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Table(name = "perfume") // Giữ tên bảng gốc, tránh migration phức tạp
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "perfume_id_seq")
    @SequenceGenerator(name = "perfume_id_seq", sequenceName = "perfume_id_seq", initialValue = 109, allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "perfume_title")
    private String productTitle;

    @Column(name = "perfumer")
    private String vendor; // Người bán / thương hiệu / nghệ nhân

    @Column(name = "year")
    private Integer year;

    @Column(name = "country")
    private String country;

    @Column(name = "perfume_gender")
    private String gender; // Có thể dùng để phân loại target audience

    @Column(name = "fragrance_top_notes")
    private String topDescription; // Mô tả ngắn (trước dùng cho top notes)

    @Column(name = "fragrance_middle_notes")
    private String middleDescription; // Mô tả trung (trước dùng cho middle notes)

    @Column(name = "fragrance_base_notes")
    private String baseDescription; // Mô tả chân (trước dùng cho base notes)

    @Column(name = "description")
    private String description; // Mô tả đầy đủ

    @Column(name = "filename")
    private String filename; // URL ảnh sản phẩm (lưu trên S3)

    @Column(name = "price")
    private Integer price; // Giá gốc (VND)

    @Column(name = "volume")
    private String volume; // Kích thước / dung tích / size

    @Column(name = "type")
    private String type; // Loại sản phẩm nội bộ

    @Column(name = "perfume_rating")
    private Double productRating; // Điểm đánh giá trung bình

    // ===== Các field mới cho quản lý shop =====
    @Column(name = "stock_quantity")
    private Integer stockQuantity; // Số lượng tồn kho

    @Column(name = "category")
    private String category; // Danh mục (Gốm sứ, Vải, Gỗ, Trang sức...)

    @Column(name = "product_status")
    private String productStatus; // ACTIVE | INACTIVE | OUT_OF_STOCK

    @OneToMany
    @ToString.Exclude
    private List<Review> reviews;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
