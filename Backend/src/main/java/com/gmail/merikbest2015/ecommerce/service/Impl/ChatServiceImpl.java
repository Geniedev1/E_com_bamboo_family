package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.ChatMessage;
import com.gmail.merikbest2015.ecommerce.domain.Conversation;
import com.gmail.merikbest2015.ecommerce.dto.chat.ChatMessageResponse;
import com.gmail.merikbest2015.ecommerce.dto.chat.ConversationResponse;
import com.gmail.merikbest2015.ecommerce.dto.chat.CustomerMessageRequest;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.repository.ChatMessageRepository;
import com.gmail.merikbest2015.ecommerce.repository.ConversationRepository;
import com.gmail.merikbest2015.ecommerce.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private static final String SENDER_CUSTOMER = "CUSTOMER";
    private static final String SENDER_ADMIN = "ADMIN";
    private static final String TOPIC_ADMIN = "/topic/chat-admin";

    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    @Transactional
    public ChatMessageResponse sendCustomerMessage(CustomerMessageRequest request) {
        Conversation conversation = conversationRepository.findByToken(request.getToken())
                .orElseGet(() -> {
                    Conversation created = new Conversation();
                    created.setToken(request.getToken());
                    created.setCreatedAt(LocalDateTime.now());
                    created.setUnreadAdmin(0);
                    created.setUnreadCustomer(0);
                    return created;
                });
        if (notBlank(request.getName())) {
            conversation.setCustomerName(request.getName());
        }
        if (notBlank(request.getEmail())) {
            conversation.setCustomerEmail(request.getEmail());
        }
        LocalDateTime now = LocalDateTime.now();
        conversation.setLastMessage(request.getContent());
        conversation.setLastMessageAt(now);
        conversation.setUnreadAdmin(nz(conversation.getUnreadAdmin()) + 1);
        conversationRepository.save(conversation);

        ChatMessage message = saveMessage(conversation, SENDER_CUSTOMER, request.getContent(), now);
        ChatMessageResponse response = toMessageResponse(message, conversation);
        broadcast(conversation, response);
        return response;
    }

    @Override
    @Transactional
    public List<ChatMessageResponse> getMessagesByToken(String token) {
        Conversation conversation = conversationRepository.findByToken(token).orElse(null);
        if (conversation == null) {
            return java.util.Collections.emptyList();
        }
        // Khách mở hội thoại -> đã đọc tin của admin.
        if (nz(conversation.getUnreadCustomer()) != 0) {
            conversation.setUnreadCustomer(0);
            conversationRepository.save(conversation);
        }
        return toMessageResponses(conversation);
    }

    @Override
    public List<ConversationResponse> getConversations() {
        return conversationRepository.findByOrderByLastMessageAtDesc().stream()
                .map(this::toConversationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ChatMessageResponse> getConversationMessages(Long conversationId) {
        Conversation conversation = getConversation(conversationId);
        if (nz(conversation.getUnreadAdmin()) != 0) {
            conversation.setUnreadAdmin(0);
            conversationRepository.save(conversation);
        }
        return toMessageResponses(conversation);
    }

    @Override
    @Transactional
    public ChatMessageResponse sendAdminReply(Long conversationId, String content) {
        Conversation conversation = getConversation(conversationId);
        LocalDateTime now = LocalDateTime.now();
        conversation.setLastMessage(content);
        conversation.setLastMessageAt(now);
        conversation.setUnreadCustomer(nz(conversation.getUnreadCustomer()) + 1);
        conversationRepository.save(conversation);

        ChatMessage message = saveMessage(conversation, SENDER_ADMIN, content, now);
        ChatMessageResponse response = toMessageResponse(message, conversation);
        broadcast(conversation, response);
        return response;
    }

    // ===== helpers =====

    private Conversation getConversation(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new ApiRequestException("Không tìm thấy hội thoại", HttpStatus.NOT_FOUND));
    }

    private ChatMessage saveMessage(Conversation conversation, String sender, String content, LocalDateTime at) {
        ChatMessage message = new ChatMessage();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(content);
        message.setCreatedAt(at);
        return chatMessageRepository.save(message);
    }

    private void broadcast(Conversation conversation, ChatMessageResponse response) {
        messagingTemplate.convertAndSend("/topic/chat/" + conversation.getToken(), response);
        messagingTemplate.convertAndSend(TOPIC_ADMIN, response);
    }

    private List<ChatMessageResponse> toMessageResponses(Conversation conversation) {
        return chatMessageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId()).stream()
                .map(m -> toMessageResponse(m, conversation))
                .collect(Collectors.toList());
    }

    private ChatMessageResponse toMessageResponse(ChatMessage message, Conversation conversation) {
        ChatMessageResponse dto = new ChatMessageResponse();
        dto.setId(message.getId());
        dto.setConversationId(conversation.getId());
        dto.setToken(conversation.getToken());
        dto.setSender(message.getSender());
        dto.setContent(message.getContent());
        dto.setCreatedAt(message.getCreatedAt() != null ? message.getCreatedAt().toString() : null);
        return dto;
    }

    private ConversationResponse toConversationResponse(Conversation c) {
        ConversationResponse dto = new ConversationResponse();
        dto.setId(c.getId());
        dto.setToken(c.getToken());
        dto.setCustomerName(c.getCustomerName());
        dto.setCustomerEmail(c.getCustomerEmail());
        dto.setLastMessage(c.getLastMessage());
        dto.setLastMessageAt(c.getLastMessageAt() != null ? c.getLastMessageAt().toString() : null);
        dto.setUnreadAdmin(nz(c.getUnreadAdmin()));
        return dto;
    }

    private static int nz(Integer value) {
        return value == null ? 0 : value;
    }

    private static boolean notBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }
}
