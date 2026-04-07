package com.example.lms.service;

import com.example.lms.dto.CourseRegisterRequest;
import com.example.lms.entity.Course;
import com.example.lms.entity.CourseRegister;
import com.example.lms.repository.CourseRegisterRepository;
import com.example.lms.repository.CourseRepository;
import com.example.lms.repository.StudentRepository;
import jakarta.annotation.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseRegisterService {
    @Resource
    private CourseRegisterRepository courseRegisterRepository;
    @Resource
    private CourseRepository courseRepository;
    @Resource
    private StudentRepository studentRepository;

    public CourseRegister save(CourseRegisterRequest courseRegisterRequest) {
         Course course = courseRepository.findById(courseRegisterRequest.getCourseId()).orElse(null);
         if(course == null) {
             return null;
         }
         List<CourseRegister> existList = courseRegisterRepository.findByCourse_IdAndStudent_Id(
                 courseRegisterRequest.getCourseId(),  courseRegisterRequest.getStudentId());
         if(!existList.isEmpty()) {
             return null;
         }


         if(course.getCapacity() > courseRegisterRepository.countByCourse_Id(courseRegisterRequest.getCourseId())) {
             CourseRegister courseRegister = new CourseRegister();

             courseRegister.setCourse(courseRepository.getReferenceById(courseRegisterRequest.getCourseId()));
             courseRegister.setStudent(studentRepository.getReferenceById(courseRegisterRequest.getStudentId()));
             courseRegister.setCreateAt(LocalDateTime.now());

             return courseRegisterRepository.save(courseRegister);
         } else {
             return null;
         }
    }

    public CourseRegister delete(CourseRegisterRequest courseRegisterRequest) {
        return courseRegisterRepository.deleteByStudent_IdAndCourse_Id(
                courseRegisterRequest.getStudentId(), courseRegisterRequest.getCourseId());
    }

    public List<CourseRegister> findByCourseId(int courseId) {
        return courseRegisterRepository.findByCourse_Id(courseId);
    }

    public Long countByCourseId(int courseId) {
        return courseRegisterRepository.countByCourse_Id(courseId);
    }

}
