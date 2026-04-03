package com.example.lms.controller;

import com.example.lms.dto.AttendanceByMonthRequest;
import com.example.lms.dto.StudentScoreDto;
import com.example.lms.entity.Attendance;
import com.example.lms.entity.Score;
import com.example.lms.entity.Student;
import com.example.lms.service.AttendanceService;
import com.example.lms.service.ScoreService;
import com.example.lms.service.StudentService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Resource
    private StudentService studentService;
    @Resource
    private ScoreService scoreService;
    @Resource
    private AttendanceService attendanceService;

    @GetMapping("/list")
    List<Student> findAll() {
        return studentService.findAll();
    }

    @GetMapping("/score")
    List<StudentScoreDto> findAllScore() { return scoreService.findAll(); }

    @PostMapping("/attendance")
    List<Attendance> findAllByStudentIdWhereMonth(@RequestBody AttendanceByMonthRequest attendanceByMonthRequest) {
        return attendanceService.findAllByStudentIdWhereMonth(attendanceByMonthRequest);
    }

    @GetMapping("/{studentId}")
    Student findById(@PathVariable long studentId) {
        return studentService.findById(studentId);
    }

    @GetMapping("/score/{studentId}")
    List<Score> findAllByStudentId(@PathVariable long studentId) {
        return scoreService.findAllByStudentId(studentId);
    }
}
