package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.chat.ChatMessageResponse;
import com.gmail.merikbest2015.ecommerce.dto.chat.CustomerMessageRequest;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.API_V1_CHAT;

/**
 * Chat phía khách (guest hoặc user). Công khai, định danh bằng token trong body/param.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_CHAT)
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/messages")
    public ResponseEntity<ChatMessageResponse> sendMessage(@RequestBody @Valid CustomerMessageRequest request,
                                                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        return ResponseEntity.ok(chatService.sendCustomerMessage(request));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@RequestParam String token) {
        return ResponseEntity.ok(chatService.getMessagesByToken(token));
    }
}
