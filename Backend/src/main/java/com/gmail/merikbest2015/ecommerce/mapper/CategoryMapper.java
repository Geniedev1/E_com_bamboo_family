package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Category;
import com.gmail.merikbest2015.ecommerce.dto.category.CategoryRequest;
import com.gmail.merikbest2015.ecommerce.dto.category.CategoryResponse;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final CommonMapper commonMapper;
    private final CategoryService categoryService;

    public List<CategoryResponse> getAllCategories() {
        return commonMapper.convertToResponseList(categoryService.getAllCategories(), CategoryResponse.class);
    }

    public CategoryResponse createCategory(CategoryRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Category category = commonMapper.convertToEntity(request, Category.class);
        return commonMapper.convertToResponse(categoryService.createCategory(category), CategoryResponse.class);
    }

    public CategoryResponse updateCategory(Long id, CategoryRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Category category = commonMapper.convertToEntity(request, Category.class);
        return commonMapper.convertToResponse(categoryService.updateCategory(id, category), CategoryResponse.class);
    }

    public String deleteCategory(Long id) {
        return categoryService.deleteCategory(id);
    }
}
