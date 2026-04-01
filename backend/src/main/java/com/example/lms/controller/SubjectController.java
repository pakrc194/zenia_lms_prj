package com.example.lms.controller;

import com.example.lms.entity.Subject;
import com.example.lms.repository.SubjectRepository;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subject")
public class SubjectController {

    @Resource
    private SubjectRepository subjectRepository;

    @GetMapping("/list")
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }
}
