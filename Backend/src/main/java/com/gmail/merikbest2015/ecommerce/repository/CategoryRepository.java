package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByOrderBySortOrderAscNameAsc();

    Optional<Category> findByName(String name);

    boolean existsByNameIgnoreCase(String name);
}
