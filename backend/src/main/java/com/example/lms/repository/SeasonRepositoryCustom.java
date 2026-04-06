package com.example.lms.repository;

import com.example.lms.entity.Season;

import java.util.List;

public interface SeasonRepositoryCustom {
    List<Season> findAllOrderByIdDesc(int pageNo, int limit);
}
