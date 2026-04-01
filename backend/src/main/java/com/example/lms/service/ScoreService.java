package com.example.lms.service;

import com.example.lms.dto.StudentScoreDto;
import com.example.lms.entity.Score;
import com.example.lms.repository.ScoreRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {
    @Resource
    private ScoreRepository scoreRepository;

    public List<StudentScoreDto> findAll() {
        return scoreRepository.findAllScore().stream().map(StudentScoreDto::from).toList();
    }
}
