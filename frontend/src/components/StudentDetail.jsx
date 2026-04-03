import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function StudentDetail() {
    const {id} = useParams()
    const [today, setToday] = useState(new Date())
    const [attends, setAttends] = useState([])
    const [scores, setScores] = useState({})
    const [student, setStudent] = useState({})

    useEffect(()=>{
        const fetchAttends = async () => {
            const {data} = await api.post("/student/attendance", {
                studentId: id,
                month: today.getMonth()+1
            })
            console.log(data)
            setAttends(data)
        }
        fetchAttends()

    },[id, today])

    useEffect(()=>{
        const fetchScores = async () => {
            const {data} = await api.get(`/student/score/${id}`)
            console.log("score ",data)

        }
        fetchScores()

        const fetchStudent = async () => {
            const {data} = await api.get(`/student/${id}`)
            setStudent(data)
        }
        fetchStudent()

    },[id])


    const presentCount = attends.filter(v=>v.status!="absent").length;
    const daysCount = (new Date(today.getFullYear(), today.getMonth()+1, 0)).getDate()

    return (
        <>
            <h1>{student && `${student.name}(${student.grade}-${student.className})`}</h1>
            <div>
                <h2>Attendance</h2>
                <div>
                    <button className="nav-btn" onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()-1, 1))}>&lt;</button>
                    <h2>{`${today.getFullYear()}년 ${today.getMonth()+1}월`}</h2>
                    <button className="nav-btn" onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()+1, 1))}>&gt;</button>
                </div>

                <div>
                    <h2>월 출석 ({`${presentCount}/${daysCount}`})</h2>
                    {attends.map(at=>(
                        <div key={at.id}>
                            {`${at.attendDate} | ${at.status}`}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Score</h2>
            </div>
        </>
    )
}
