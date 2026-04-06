package com.example.lms.repository;

import com.example.lms.entity.Season;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.Resource;

import java.util.List;

import static com.example.lms.entity.QSeason.season;

public class SeasonRepositoryImpl implements SeasonRepositoryCustom {
    @Resource
    JPAQueryFactory queryFactory;


    public List<Season> findAllOrderByIdDesc(int pageNo, int limit) {
        return queryFactory.
                select(season).
                from(season)
                .orderBy(season.id.desc())
                .offset((long)(pageNo-1) *limit)
                .limit(limit)
                .fetch();
    }
}
