import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import Calendar from './Calendar'
import './Calendar.css'

export default function Attendance() {
    const [attendances, setAttendances] = useState([])

    return (
        <>
            <h1>Attendance</h1>
            <div>
                <Calendar setAttendances={setAttendances}/>
            </div>
            {attendances.length>0?<div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>학년</th>
                            <th>반</th>
                            <th>이름</th>
                            <th>출석</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.map((v, k)=>(
                            <tr key={v.id}>
                                <td>{k+1}</td>
                                <td>{v.student.grade}</td>
                                <td>{v.student.className}</td>
                                <td>{v.student.name}</td>
                                <td>{v.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <div> 출결 정보가 없습니다. </div>}
        </>
    )
}
