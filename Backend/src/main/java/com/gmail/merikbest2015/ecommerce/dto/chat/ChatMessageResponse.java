package com.gmail.merikbest2015.ecommerce.dto.chat;

import lombok.Data;

@Data
public class ChatMessageResponse {
    private Long id;
    private Long conversationId;
    private String token;
    private String sender;   // CUSTOMER | ADMIN
    private String content;
    private String createdAt; // ISO-8601
}
