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
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_seq")
    @SequenceGenerator(name = "product_id_seq", sequenceName = "product_id_seq", initialValue = 109, allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "product_title")
    private String productTitle;

    @Column(name = "vendor")
    private String vendor; // Người bán / thương hiệu / nghệ nhân

    @Column(name = "year")
    private Integer year;

    @Column(name = "country")
    private String country;

    @Column(name = "gender")
    private String gender; // Có thể dùng để phân loại target audience

    @Column(name = "top_description")
    private String topDescription; // Mô tả ngắn

    @Column(name = "middle_description")
    private String middleDescription; // Mô tả trung

    @Column(name = "base_description")
    private String baseDescription; // Mô tả chân

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

    @Column(name = "product_rating")
    private Double productRating; // Điểm đánh giá trung bình

    // ===== Các field mới cho quản lý shop =====
    @Column(name = "stock_quantity")
    private Integer stockQuantity; // Số lượng tồn kho

    @Column(name = "category")
    private String category; // Danh mục (Gốm sứ, Vải, Gỗ, Trang sức...)

    @Column(name = "product_status")
    private String productStatus; // ACTIVE | INACTIVE | OUT_OF_STOCK

    @OneToMany
    @JoinTable(
            name = "product_reviews",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "reviews_id")
    )
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
