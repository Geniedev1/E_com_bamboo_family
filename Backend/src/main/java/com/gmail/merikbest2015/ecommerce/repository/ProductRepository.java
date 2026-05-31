package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.repository.projection.ProductProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<ProductProjection> findAllByOrderByIdAsc();

    // JPQL dùng tên class Product (không phải tên bảng)
    @Query("SELECT p FROM Product p ORDER BY p.id ASC")
    Page<ProductProjection> findAllByOrderByIdAsc(Pageable pageable);

    List<Product> findByVendorOrderByPriceDesc(String vendor);

    List<Product> findByGenderOrderByPriceDesc(String gender);

    List<Product> findByIdIn(List<Long> productIds);

    @Query("SELECT p FROM Product p WHERE p.id IN :productIds")
    List<ProductProjection> getProductsByIds(List<Long> productIds);

    // ===== Filter tổng hợp =====
    @Query("SELECT p FROM Product p " +
            "WHERE (coalesce(:vendors, null) IS NULL OR p.vendor IN :vendors) " +
            "AND (coalesce(:genders, null) IS NULL OR p.gender IN :genders) " +
            "AND (coalesce(:categories, null) IS NULL OR p.category IN :categories) " +
            "AND (coalesce(:priceStart, null) IS NULL OR p.price BETWEEN :priceStart AND :priceEnd) " +
            "ORDER BY CASE WHEN :sortByPrice = true THEN p.price ELSE -p.price END ASC")
    Page<ProductProjection> findProductsByFilterParams(
            List<String> vendors,
            List<String> genders,
            List<String> categories,
            Integer priceStart,
            Integer priceEnd,
            boolean sortByPrice,
            Pageable pageable);

    // ===== Full-text search =====
    @Query("SELECT p FROM Product p " +
            "WHERE UPPER(p.vendor) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY p.price DESC")
    Page<ProductProjection> findByVendor(String text, Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "WHERE UPPER(p.productTitle) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY p.price DESC")
    Page<ProductProjection> findByProductTitle(String text, Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "WHERE UPPER(p.country) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY p.price DESC")
    Page<ProductProjection> findByCountry(String text, Pageable pageable);

    // ===== Tìm theo category =====
    @Query("SELECT p FROM Product p " +
            "WHERE UPPER(p.category) = UPPER(:category) " +
            "ORDER BY p.price DESC")
    Page<ProductProjection> findByCategory(String category, Pageable pageable);
}
