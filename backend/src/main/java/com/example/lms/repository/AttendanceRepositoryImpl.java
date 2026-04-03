package com.example.lms.repository;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.dto.StudentAttendanceDto;
import com.example.lms.entity.Attendance;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.Resource;

import java.time.LocalDate;
import java.util.List;

import static com.example.lms.entity.QAttendance.attendance;
import static com.example.lms.entity.QStudent.student;

public class AttendanceRepositoryImpl implements AttendanceRepositoryCustom {
    @Resource
    JPAQueryFactory queryFactory;


    @Override
    public List<AttendByMonthDto> findAttendanceByMonth(LocalDate attendDate) {
        return queryFactory
                .select(Projections.constructor(AttendByMonthDto.class,
                    attendance.attendDate.dayOfMonth(),
                    attendance.count()))
                .from(attendance)
                .where(attendance.attendDate.month().eq(attendDate.getMonthValue())
                        .and(attendance.attendDate.year().eq(attendDate.getYear()))
                        .and(attendance.status.notEqualsIgnoreCase("absent")))
                .groupBy(attendance.attendDate.dayOfMonth())
                .fetch();
    }

    @Override
    public List<StudentAttendanceDto> findAllByAttendDate(LocalDate attendDate) {
        return queryFactory
                .select(Projections.constructor(StudentAttendanceDto.class,
                        student.id,
                        student.name,
                        student.grade,
                        student.className,
                        attendance.id,
                        attendance.status,
                        attendance.attendDate
                ))
                .from(student)
                .leftJoin(attendance)
                .on(
                        attendance.student.id.eq(student.id),
                        attendance.attendDate.eq(attendDate)  // 서브쿼리 조건을 ON절로 이동
                )
                .fetch();
    }

    @Override
    public List<Long> findStudentIdsByStatusIsPresent(LocalDate attendDate) {
        return queryFactory
                .select(Projections.constructor(Long.class,
                        student.id
                ))
                .from(student)
                .leftJoin(attendance)
                .on(
                        attendance.student.id.eq(student.id),
                        attendance.attendDate.eq(attendDate)  // 서브쿼리 조건을 ON절로 이동
                )
                .where(attendance.status.isNull().or(attendance.status.isEmpty()))
                .fetch();
    }
}
