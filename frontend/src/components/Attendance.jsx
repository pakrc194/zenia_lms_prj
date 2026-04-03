import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import Calendar from './Calendar'
import './Calendar.css'
import './Attendance.css' // ✅ 추가된 레이아웃용 CSS 파일
import { useNavigate } from 'react-router-dom'

export default function Attendance() {
    const navigate = useNavigate()
    const [attendances, setAttendances] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [attendMark, setAttendMarks] = useState([])

    const btn_present = async (v) => {
        const {data} = await api.post("/attendance", {
            studentId : v.studentId,
            attendDate : selectedDate
        })
        console.log("post : ",data)

        setAttendances(prev=>(
            prev.map(item=>{
                if(item.studentId == v.studentId) {
                    item.status = "present"
                }
                return item;
            })
        ))

        setAttendMarks(prev=>{
            const selectedDay = Number(selectedDate.split('-')[2])
            if(!prev.find(item=>item.day === selectedDay)) {
                prev.push({day: selectedDay, count: 1})
            } else {
                prev.map(item=>{
                    if(item.day === selectedDay) {
                        item.count++;
                    }
                    return item;
                })
            }
            console.log(selectedDay, prev)
            return prev;
        })
    }

    const btn_every = async() => {
        const {data} = await api.post("/attendance/every", {
            attendDate: selectedDate
        })

        setAttendances(prev=>(
            prev.map(item=>{
                if(item.status === null || item.status === "") {
                    item.status = "present"
                }
                return item;
            })
        ))

        setAttendMarks(prev=>{
            const selectedDay = Number(selectedDate.split('-')[2])
            if(!prev.find(item=>item.day === selectedDay)) {
                prev.push({day: selectedDay, count: data.length})
            } else {
                prev.map(item=>{
                    if(item.day === selectedDay) {
                        item.count+=data.length;
                    }
                    return item;
                })
            }
            console.log(selectedDay, prev)
            return prev;
        })


        console.log(data)
    }

    return (
        <>
        <h1>Attendance</h1>
        <div className="attendance-page">
            
            
            {/* ✅ Flexbox를 적용할 부모 컨테이너 */}
            <div className="attendance-layout">
                
                {/* 왼쪽: 캘린더 영역 */}
                <div className="calendar-section">
                    <Calendar 
                        setAttendances={setAttendances} 
                        selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                        attendMark={attendMark} setAttendMarks={setAttendMarks}
                    />
                </div>

                {/* 오른쪽: 학생 리스트 영역 */}
                <div className="list-section">
                    <button onClick={()=>btn_every()}>일괄 출석</button>
                    {attendances.length > 0 ? (
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>학년</th>
                                    <th>반</th>
                                    <th>이름</th>
                                    <th>출결</th>
                                    <th>처리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendances.map((v, k)=>(
                                    <tr key={v.studentId}>
                                        <td>{k+1}</td>
                                        <td>{v.grade}</td>
                                        <td>{v.className}</td>
                                        <td style={{cursor:"pointer"}} onClick={()=>navigate(`/student/${v.studentId}`)}>{v.name}</td>
                                        <td>{v.status ? v.status : "absent"}</td>
                                        <td>
                                            <button onClick={()=>btn_present(v)} disabled={v.status=="present" || v.status== "late"}>출석</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-info"> 출결 정보가 없습니다. </div>
                    )}
                </div>

            </div>
        </div>
        </>
    )
}