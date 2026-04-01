package com.example.lms.service;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.entity.Attendance;
import com.example.lms.repository.AttendanceRepository;
import jakarta.annotation.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {
    @Resource
    private AttendanceRepository attendanceRepository;

    public List<Attendance> findByDate(String date) {
        return attendanceRepository.findAllByAttendDate(LocalDate.parse(date));
    }

    public List<AttendByMonthDto> findAttendanceByMonth(String date) {
        return attendanceRepository.findAttendanceByMonth(LocalDate.parse(date));
    }
}
