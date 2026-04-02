package com.example.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 받을 메시지
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    private String roomId;
    private String sender;
    private String content;
}