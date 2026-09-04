package com.gmail.merikbest2015.ecommerce.security.oauth2;

import com.gmail.merikbest2015.ecommerce.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    @Value("${hostname}")
    private String hostname;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        String token = jwtProvider.createToken(email, "USER");
        String uri = UriComponentsBuilder.fromUriString(frontendBaseUrl() + "/oauth2/redirect")
                .queryParam("token", token)
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    // hostname có thể gồm nhiều origin (phân tách bởi dấu phẩy) và đã kèm scheme
    // (vd https://rattanovi.com). Lấy origin đầu tiên, thêm http:// nếu thiếu scheme.
    private String frontendBaseUrl() {
        String first = hostname.split(",")[0].trim();
        if (first.startsWith("http://") || first.startsWith("https://")) {
            return first;
        }
        return "http://" + first;
    }
}
