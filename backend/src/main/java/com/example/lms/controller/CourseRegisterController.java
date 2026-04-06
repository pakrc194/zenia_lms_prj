package com.example.lms.controller;

import com.example.lms.dto.CourseRegisterRequest;
import com.example.lms.entity.CourseRegister;
import com.example.lms.service.CourseRegisterService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courseRegister")
public class CourseRegisterController {

    @Resource
    private CourseRegisterService courseRegisterService;

    @PostMapping
    public CourseRegister registerCourse(@RequestBody CourseRegisterRequest courseRegisterRequest) {
        return courseRegisterService.save(courseRegisterRequest);
    }

    @DeleteMapping
    public CourseRegister deleteCourse(@RequestBody CourseRegisterRequest courseRegisterRequest) {
        return courseRegisterService.delete(courseRegisterRequest);
    }
}
