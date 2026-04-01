package com.example.lms.controller;

import com.example.lms.dto.StudentScoreDto;
import com.example.lms.entity.Score;
import com.example.lms.entity.Student;
import com.example.lms.service.ScoreService;
import com.example.lms.service.StudentService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Resource
    private StudentService studentService;
    @Resource
    private ScoreService scoreService;


    @GetMapping("/list")
    List<Student> findAll() {
        return studentService.findAll();
    }

    @GetMapping("/score")
    List<StudentScoreDto> findAllScore() { return scoreService.findAll(); }
}
