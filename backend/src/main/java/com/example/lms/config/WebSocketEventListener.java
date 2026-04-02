package com.example.lms.config;

import com.example.lms.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;

    // 연결 시
    @EventListener
    public void handleWebSocketConnect(SessionConnectedEvent event) {
        log.info("새로운 WebSocket 연결: {}", event.getUser());
    }

    // 연결 해제 시
    @EventListener
    public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) accessor.getSessionAttributes().get("username");

        if (username != null) {
            log.info("WebSocket 연결 해제: {}", username);

            // 퇴장 메시지 전송
            MessageResponse response = new MessageResponse(
                    null, "SYSTEM", username + "님이 퇴장했습니다.", LocalDateTime.now()
            );
            messagingTemplate.convertAndSend("/topic/public", response);
        }
    }
}