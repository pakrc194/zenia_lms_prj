package com.example.lms.controller;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.dto.AttendanceRequest;
import com.example.lms.dto.StudentAttendanceDto;
import com.example.lms.entity.Attendance;
import com.example.lms.service.AttendanceService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    @Resource
    private AttendanceService attendanceService;

    @GetMapping("/list")
    List<StudentAttendanceDto> findAllAttendance(@RequestParam String date) {
        return attendanceService.findByDate(date);
    }

    @GetMapping("/month")
    List<AttendByMonthDto> findAttendanceByMonth(@RequestParam String date) {
        return attendanceService.findAttendanceByMonth(date);
    }

    @PostMapping
    Attendance addAttendance(@RequestBody AttendanceRequest attendance) {
        System.out.println("AttendanceController addAttendance : "+ attendance);

        return attendanceService.saveAttendance(attendance);
    }
}
