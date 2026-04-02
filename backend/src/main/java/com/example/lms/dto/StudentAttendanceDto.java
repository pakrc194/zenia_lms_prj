package com.example.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class StudentAttendanceDto {
    private Long studentId;
    private String name;
    private Integer grade;
    private String className;

    private Long attendanceId;
    private String status;
    private LocalDate attendDate;
}
