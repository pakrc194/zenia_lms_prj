package com.example.lms.service;


import com.example.lms.dto.CourseRequest;
import com.example.lms.entity.Course;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.SeasonRepository;
import com.example.lms.repository.SubjectRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Resource
    private CourseRepository courseRepository;
    @Resource
    private SeasonRepository seasonRepository;
    @Resource
    private SubjectRepository subjectRepository;


    public Course save(CourseRequest course) {
        Course newCourse = new Course();
        newCourse.setLocation(course.getLocation());
        newCourse.setCapacity(course.getCapacity());
        newCourse.setSeason(seasonRepository.findById(course.getSeasonId()).orElse(null));
        newCourse.setSubject(subjectRepository.findById(course.getSubjectId()).orElse(null));

        return courseRepository.save(newCourse);
    }

    public List<Course> findBySeasonId(int seasonId) {
        return courseRepository.findBySeasonId(seasonId);
    }
}
