package com.example.lms.repository;

import com.example.lms.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Integer> {

    @Query("""
        select sc from Score sc join fetch sc.student join fetch sc.subject
    """)
    List<Score> findAllScore();

    List<Score> findAllByStudentId(Long studentId);
}
