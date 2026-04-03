package com.example.lms.dto;

import lombok.Data;

@Data
public class AttendanceByMonthRequest {
    Long studentId;
    int month;
}
