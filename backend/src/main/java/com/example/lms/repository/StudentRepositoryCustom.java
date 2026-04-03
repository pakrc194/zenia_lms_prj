package com.example.lms.repository;

import com.example.lms.entity.Attendance;
import com.example.lms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepositoryCustom extends JpaRepository<Student, Long> {

}
