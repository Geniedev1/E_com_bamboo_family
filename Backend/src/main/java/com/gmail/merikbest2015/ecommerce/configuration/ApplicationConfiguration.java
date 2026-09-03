package com.gmail.merikbest2015.ecommerce.configuration;

import com.gmail.merikbest2015.ecommerce.domain.Category;
import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.FullProductResponse;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductResponse;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfiguration {

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);

        // Product.category (quan hệ Category) -> DTO.category là TÊN danh mục (String).
        Converter<Category, String> categoryToName = ctx ->
                ctx.getSource() == null ? null : ctx.getSource().getName();
        mapper.createTypeMap(Product.class, ProductResponse.class)
                .addMappings(m -> m.using(categoryToName).map(Product::getCategory, ProductResponse::setCategory));
        mapper.createTypeMap(Product.class, FullProductResponse.class)
                .addMappings(m -> m.using(categoryToName).map(Product::getCategory, FullProductResponse::setCategory));

        return mapper;
    }

    @Bean
    public SpelAwareProxyProjectionFactory projectionFactory() {
        return new SpelAwareProxyProjectionFactory();
    }
}
