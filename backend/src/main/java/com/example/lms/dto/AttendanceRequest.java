package com.example.lms.dto;

import com.example.lms.entity.Attendance;
import com.example.lms.entity.Student;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceRequest {
    Long studentId;
    LocalDate attendDate;

    public Attendance toEntity() {
        Attendance attendance = new Attendance();
        Student student = new Student();
        student.setId(studentId);

        attendance.setStudent(student);
        attendance.setStatus("present");
        attendance.setAttendDate(attendDate);

        return attendance;
    }
}
