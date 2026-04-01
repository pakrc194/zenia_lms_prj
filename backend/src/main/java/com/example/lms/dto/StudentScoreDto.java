package com.example.lms.dto;

import com.example.lms.entity.Score;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class StudentScoreDto {
    private Long id;
    private String name;
    private int grade;
    private String className;
    private String subject;
    private int score;
    private int credit;

    public static StudentScoreDto from(Score score) {
        StudentScoreDto dto = new StudentScoreDto();

        dto.setId(score.getStudent().getId());
        dto.setName(score.getStudent().getName());
        dto.setGrade(score.getStudent().getGrade());
        dto.setClassName(score.getStudent().getClassName());
        dto.setSubject(score.getSubject().getName());
        dto.setScore(score.getScore());
        dto.setCredit(score.getSubject().getCredit());

        return dto;
    }
}
