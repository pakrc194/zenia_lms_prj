package com.example.lms.controller;

import com.example.lms.entity.Student;
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

    @GetMapping("list")
    List<Student> findAll() {
        return studentService.findAll();
    }
}
