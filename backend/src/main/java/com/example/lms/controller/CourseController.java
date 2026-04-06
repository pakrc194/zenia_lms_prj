package com.example.lms.controller;

import com.example.lms.dto.CourseRequest;
import com.example.lms.entity.Course;
import com.example.lms.entity.CourseRegister;
import com.example.lms.service.CourseRegisterService;
import com.example.lms.service.CourseService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Resource
    private CourseService courseService;

    @Resource
    private CourseRegisterService courseRegisterService;

    @GetMapping("/{seasonId}")
    public List<Course> findBySeasonId(@PathVariable int seasonId) {
        return courseService.findBySeasonId(seasonId);
    }

    @PostMapping
    public Course save(@RequestBody CourseRequest course) {
        System.out.println("save course : "+course);
        return courseService.save(course);
    }

    @GetMapping("/student/list")
    public List<CourseRegister> findByCourseId(@RequestParam int courseId) {
        return courseRegisterService.findByCourseId(courseId);
    }
}
