package com.example.lms.service;

import com.example.lms.entity.Subject;
import com.example.lms.repository.SubjectRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    @Resource
    private SubjectRepository subjectRepository;

    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }
}
