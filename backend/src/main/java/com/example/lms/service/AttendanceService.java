package com.example.lms.service;

import com.example.lms.dto.AttendByMonthDto;
import com.example.lms.dto.AttendanceRequest;
import com.example.lms.dto.StudentAttendanceDto;
import com.example.lms.entity.Attendance;
import com.example.lms.entity.Student;
import com.example.lms.repository.AttendanceRepository;
import com.example.lms.repository.AttendanceRepositoryImpl;
import com.example.lms.repository.StudentRepository;
import jakarta.annotation.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttendanceService {
    @Resource
    private AttendanceRepository attendanceRepository;

    @Resource
    private AttendanceRepositoryImpl attendanceRepositoryImpl;

    @Resource
    private StudentRepository studentRepository;

    public List<StudentAttendanceDto> findByDate(String date) {
        return attendanceRepositoryImpl.findAllByAttendDate(LocalDate.parse(date));
    }

    public List<AttendByMonthDto> findAttendanceByMonth(String date) {
        return attendanceRepositoryImpl.findAttendanceByMonth(LocalDate.parse(date));
    }

    public Attendance saveAttendance(AttendanceRequest attendance) {
        return attendanceRepository.save(attendance.toEntity());
    }

    public List<Attendance> saveAttendanceEvery(AttendanceRequest attendance) {


        List<Long> studentIds = attendanceRepositoryImpl.findStudentIdsByStatusIsPresent(attendance.getAttendDate());
        System.out.println(studentIds);

        List<Attendance> attendList = new ArrayList<>();
        for(Long studentId : studentIds) {
            AttendanceRequest aq = new AttendanceRequest();
            aq.setStudentId(studentId);
            aq.setAttendDate(attendance.getAttendDate());

            attendList.add(aq.toEntity());
        }

        return attendanceRepository.saveAll(attendList);
    }
}
