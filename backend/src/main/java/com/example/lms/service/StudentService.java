package com.example.lms.service;

import com.example.lms.entity.Student;
import com.example.lms.repository.StudentRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Resource
    private StudentRepository studentRepository;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }
}
