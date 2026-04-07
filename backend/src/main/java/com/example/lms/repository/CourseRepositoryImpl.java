package com.example.lms.repository;


import com.example.lms.dto.CourseStatusResponse;
import com.example.lms.entity.Course;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.Resource;

import java.util.List;

import static com.example.lms.entity.QCourse.course;
import static com.example.lms.entity.QCourseRegister.courseRegister;
import static com.example.lms.entity.QSubject.subject;

public class CourseRepositoryImpl implements CourseRepositoryCustom {
    @Resource
    JPAQueryFactory queryFactory;

    @Override
    public List<CourseStatusResponse> findLeftJoinRegisterBySeasonId(int seasonId) {

        return queryFactory
                .select(Projections.constructor(CourseStatusResponse.class,
                        course.id,
                        course.subject.name,
                        course.subject.teacher,
                        course.location,
                        course.capacity,
                        courseRegister.count()
                ))
                .from(course)
                .join(course.subject)
                .leftJoin(courseRegister).on(courseRegister.course.id.eq(course.id))
                .where(course.season.id.eq(seasonId))
                .groupBy(
                        course.id,
                        course.subject.name,
                        course.subject.teacher,
                        course.location,
                        course.capacity
                )
                .fetch();
    }
}
