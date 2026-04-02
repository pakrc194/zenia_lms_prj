package com.example.lms.controller;

import com.example.lms.dto.MessageRequest;
import com.example.lms.dto.MessageResponse;
import jakarta.annotation.Resource;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/chat")
public class ChatController {
    @Resource
    SimpMessagingTemplate messagingTemplate;

    // 클라이언트가 /app/chat 으로 보내면
    // /topic/chat/{roomId} 구독자들에게 전송
    @MessageMapping("/chat")
    public void sendMessage(MessageRequest request) {

        MessageResponse response = new MessageResponse(
                request.getRoomId(),
                request.getSender(),
                request.getContent(),
                LocalDateTime.now()
        );

        // 특정 방 구독자에게 전송
        messagingTemplate.convertAndSend(
                "/topic/chat/" + request.getRoomId(),
                response
        );
    }

    // 특정 유저에게만 전송 (1:1)
    @MessageMapping("/private")
    public void sendPrivateMessage(MessageRequest request,
                                   Principal principal) {
        MessageResponse response = new MessageResponse(
                request.getRoomId(),
                request.getSender(),
                request.getContent(),
                LocalDateTime.now()
        );

        // 특정 유저에게만 전송
        messagingTemplate.convertAndSendToUser(
                request.getRoomId(),  // 수신자 username
                "/queue/private",
                response
        );
    }
}
