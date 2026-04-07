package com.example.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseStatusResponse {
    Integer id;
    String subject;
    String teacher;
    String location;
    Integer capacity;
    Long status;
}
