package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.chat.AdminReplyRequest;
import com.gmail.merikbest2015.ecommerce.dto.chat.ChatMessageResponse;
import com.gmail.merikbest2015.ecommerce.dto.chat.ConversationResponse;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.API_V1_ADMIN_CHAT;

/**
 * Hộp thư chat phía admin (chung của shop). Yêu cầu quyền ADMIN.
 */
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping(API_V1_ADMIN_CHAT)
public class AdminChatController {

    private final ChatService chatService;

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponse>> getConversations() {
        return ResponseEntity.ok(chatService.getConversations());
    }

    @GetMapping("/conversations/{id}/messages")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@PathVariable Long id) {
        return ResponseEntity.ok(chatService.getConversationMessages(id));
    }

    @PostMapping("/conversations/{id}/messages")
    public ResponseEntity<ChatMessageResponse> reply(@PathVariable Long id,
                                                     @RequestBody @Valid AdminReplyRequest request,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        return ResponseEntity.ok(chatService.sendAdminReply(id, request.getContent()));
    }
}
