package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.dto.chat.ChatMessageResponse;
import com.gmail.merikbest2015.ecommerce.dto.chat.ConversationResponse;
import com.gmail.merikbest2015.ecommerce.dto.chat.CustomerMessageRequest;

import java.util.List;

public interface ChatService {

    ChatMessageResponse sendCustomerMessage(CustomerMessageRequest request);

    List<ChatMessageResponse> getMessagesByToken(String token);

    List<ConversationResponse> getConversations();

    List<ChatMessageResponse> getConversationMessages(Long conversationId);

    ChatMessageResponse sendAdminReply(Long conversationId, String content);
}
