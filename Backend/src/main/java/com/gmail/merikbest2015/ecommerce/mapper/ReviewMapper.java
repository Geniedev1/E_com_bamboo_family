package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequest;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponse;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewMapper {

    private final CommonMapper commonMapper;
    private final ReviewService reviewService;

    public List<ReviewResponse> getReviewsByProductId(Long productId) {
        return commonMapper.convertToResponseList(reviewService.getReviewsByProductId(productId), ReviewResponse.class);
    }

    // backward compat alias — ReviewController cũ gọi cái này
    public List<ReviewResponse> getReviewsByPerfumeId(Long perfumeId) {
        return getReviewsByProductId(perfumeId);
    }

    public ReviewResponse addReviewToProduct(ReviewRequest reviewRequest, Long productId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Review review = commonMapper.convertToEntity(reviewRequest, Review.class);
        return commonMapper.convertToResponse(reviewService.addReviewToProduct(review, productId), ReviewResponse.class);
    }

    // backward compat alias
    public ReviewResponse addReviewToPerfume(ReviewRequest reviewRequest, Long perfumeId, BindingResult bindingResult) {
        return addReviewToProduct(reviewRequest, perfumeId, bindingResult);
    }
}

