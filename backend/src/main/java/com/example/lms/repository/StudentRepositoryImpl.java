package com.example.lms.repository;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.dto.StudentAttendanceDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.Resource;

import java.time.LocalDate;
import java.util.List;

import static com.example.lms.entity.QAttendance.attendance;
import static com.example.lms.entity.QStudent.student;

public abstract class StudentRepositoryImpl implements StudentRepositoryCustom {
    @Resource
    JPAQueryFactory queryFactory;



}
