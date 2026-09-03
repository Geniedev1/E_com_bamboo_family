package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.category.CategoryRequest;
import com.gmail.merikbest2015.ecommerce.dto.category.CategoryResponse;
import com.gmail.merikbest2015.ecommerce.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.API_V1_CATEGORIES;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.CATEGORY_ID;

/**
 * Danh mục sản phẩm. GET công khai (cho bộ lọc + dropdown), thêm/sửa/xóa yêu cầu ADMIN.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_CATEGORIES)
public class CategoryController {

    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryMapper.getAllCategories());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody @Valid CategoryRequest request,
                                                           BindingResult bindingResult) {
        return ResponseEntity.ok(categoryMapper.createCategory(request, bindingResult));
    }

    @PutMapping(CATEGORY_ID)
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id,
                                                           @RequestBody @Valid CategoryRequest request,
                                                           BindingResult bindingResult) {
        return ResponseEntity.ok(categoryMapper.updateCategory(id, request, bindingResult));
    }

    @DeleteMapping(CATEGORY_ID)
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        return ResponseEntity.ok(categoryMapper.deleteCategory(id));
    }
}
