package com.example.lms.controller;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.entity.Attendance;
import com.example.lms.service.AttendanceService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    @Resource
    private AttendanceService attendanceService;

    @GetMapping("/list")
    List<Attendance> findAllAttendance(@RequestParam String date) {
        return attendanceService.findByDate(date);
    }

    @GetMapping("/month")
    List<AttendByMonthDto> findAttendanceByMonth(@RequestParam String date) {
        return attendanceService.findAttendanceByMonth(date);
    }
}
