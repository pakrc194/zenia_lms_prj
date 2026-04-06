package com.example.lms.service;

import com.example.lms.dto.PageRequest;
import com.example.lms.entity.Season;
import com.example.lms.repository.SeasonRepository;
import com.example.lms.repository.SeasonRepositoryImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeasonService {
    @Resource
    SeasonRepository seasonRepository;
    @Resource
    SeasonRepositoryImpl seasonRepositoryImpl;

    public List<Season> list(PageRequest pageRequest) {
        return seasonRepositoryImpl.findAllOrderByIdDesc(pageRequest.getPageNo(), pageRequest.getLimit());
    }

    public Long count() {
        return seasonRepository.count();
    }

    public Season save(Season season) {
        return seasonRepository.save(season);
    }

    public Season findById(int seasonId) {
        return seasonRepository.findById(seasonId).orElse(null);
    }
}
