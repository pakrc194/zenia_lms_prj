package com.example.lms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 구독 prefix - 클라이언트가 메시지 받을 때
        registry.enableSimpleBroker("/topic", "/queue");

        // 발행 prefix - 클라이언트가 메시지 보낼 때
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")           // 연결 endpoint
                .setAllowedOriginPatterns("*") // CORS
                .withSockJS();                 // SockJS 지원 (구형 브라우저 대비)
    }
}
