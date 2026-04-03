package com.example.lms.repository;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.dto.StudentAttendanceDto;
import com.example.lms.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepositoryCustom {
    List<AttendByMonthDto> findAttendanceByMonth(LocalDate attendDate);
    List<StudentAttendanceDto> findAllByAttendDate(LocalDate attendDate);
    List<Long> findStudentIdsByStatusIsPresent(LocalDate attendDate);
}
