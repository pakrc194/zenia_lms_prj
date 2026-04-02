package com.example.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 보낼 메시지
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private String roomId;
    private String sender;
    private String content;
    private LocalDateTime sentAt;
}