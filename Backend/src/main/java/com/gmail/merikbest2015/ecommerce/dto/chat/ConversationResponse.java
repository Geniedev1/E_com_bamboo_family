package com.gmail.merikbest2015.ecommerce.dto.chat;

import lombok.Data;

@Data
public class ConversationResponse {
    private Long id;
    private String token;
    private String customerName;
    private String customerEmail;
    private String lastMessage;
    private String lastMessageAt; // ISO-8601
    private Integer unreadAdmin;
}
