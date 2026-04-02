import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import Calendar from './Calendar'
import './Calendar.css'

export default function Attendance() {
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

    return (
        <>
            <h1>Attendance</h1>
            <div>
                <Calendar 
                    setAttendances={setAttendances} 
                    selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                    attendMark={attendMark} setAttendMarks={setAttendMarks}/>
            </div>
            {attendances.length>0?<div>
                <table>
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
                                <td>{v.name}</td>
                                <td>{v.status? v.status : "absent"}</td>
                                <td>
                                    <button onClick={()=>btn_present(v)} disabled={v.status=="present" || v.status== "late"}>출석</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <div> 출결 정보가 없습니다. </div>}
        </>
    )
}
