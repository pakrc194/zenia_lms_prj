package com.example.lms.service;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.dto.AttendanceRequest;
import com.example.lms.dto.StudentAttendanceDto;
import com.example.lms.entity.Attendance;
import com.example.lms.repository.AttendanceRepository;
import com.example.lms.repository.AttendanceRepositoryImpl;
import jakarta.annotation.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {
    @Resource
    private AttendanceRepository attendanceRepository;

    @Resource
    private AttendanceRepositoryImpl attendanceRepositoryImpl;

    public List<StudentAttendanceDto> findByDate(String date) {
        return attendanceRepositoryImpl.findAllByAttendDate(LocalDate.parse(date));
    }

    public List<AttendByMonthDto> findAttendanceByMonth(String date) {
        return attendanceRepositoryImpl.findAttendanceByMonth(LocalDate.parse(date));
    }

    public Attendance saveAttendance(AttendanceRequest attendance) {
        return attendanceRepository.save(attendance.toEntity());
    }
}
