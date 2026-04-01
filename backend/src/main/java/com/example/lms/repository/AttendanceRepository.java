package com.example.lms.repository;

import com.example.lms.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query("select a from Attendance a join fetch a.student")
    List<Attendance> findAllAttendance();

    List<Attendance> findAllByAttendDate(LocalDate attendDate);
}
