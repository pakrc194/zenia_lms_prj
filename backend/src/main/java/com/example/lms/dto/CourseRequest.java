package com.example.lms.dto;

import lombok.Data;

@Data
public class CourseRequest {
    int subjectId;
    int seasonId;
    String location;
    int capacity;
}
