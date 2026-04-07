package com.example.lms.repository;

import com.example.lms.dto.CourseStatusResponse;
import com.example.lms.entity.Course;

import java.util.List;

public interface CourseRepositoryCustom {
    List<CourseStatusResponse> findLeftJoinRegisterBySeasonId(int seasonId);
}
