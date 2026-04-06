package com.example.lms.repository;

import com.example.lms.entity.CourseRegister;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRegisterRepository extends JpaRepository<CourseRegister, Long> {
    CourseRegister deleteByStudent_IdAndCourse_Id(Long studentId, int courseId);

    long countByCourse_Id(int courseId);

    List<CourseRegister> findByCourse_Id(int courseId);
}
