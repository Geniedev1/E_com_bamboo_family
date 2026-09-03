package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Category;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.repository.CategoryRepository;
import com.gmail.merikbest2015.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findByOrderBySortOrderAscNameAsc();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy danh mục", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public Category createCategory(Category category) {
        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new ApiRequestException("Tên danh mục đã tồn tại", HttpStatus.CONFLICT);
        }
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Category updateCategory(Long id, Category data) {
        Category category = getCategoryById(id);
        categoryRepository.findByName(data.getName())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new ApiRequestException("Tên danh mục đã tồn tại", HttpStatus.CONFLICT);
                });
        category.setName(data.getName());
        category.setDescription(data.getDescription());
        category.setSortOrder(data.getSortOrder());
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public String deleteCategory(Long id) {
        Category category = getCategoryById(id);
        try {
            categoryRepository.delete(category);
            categoryRepository.flush(); // buộc FK check ngay để bắt được lỗi ràng buộc
        } catch (DataIntegrityViolationException e) {
            throw new ApiRequestException(
                    "Không thể xóa danh mục đang có sản phẩm. Hãy chuyển sản phẩm sang danh mục khác trước.",
                    HttpStatus.CONFLICT);
        }
        return "Đã xóa danh mục";
    }
}
