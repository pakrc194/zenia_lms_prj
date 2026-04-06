package com.example.lms.controller;

import com.example.lms.dto.PageRequest;
import com.example.lms.entity.Season;
import com.example.lms.service.SeasonService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/season")
public class SeasonController {
    @Resource
    private SeasonService seasonService;

    @GetMapping
    public List<Season> getSeasons(@ModelAttribute PageRequest pageRequest) {
        System.out.println("getSeasons : "+pageRequest);
        return seasonService.list(pageRequest);
    }

    @GetMapping("/count")
    public Long count() {
        return seasonService.count();
    }

    @PostMapping
    public Season create(@RequestBody Season season) {
        return seasonService.save(season);
    }

    @GetMapping("/{seasonId}")
    public Season getSeason(@PathVariable int seasonId) {
        return seasonService.findById(seasonId);
    }
}
