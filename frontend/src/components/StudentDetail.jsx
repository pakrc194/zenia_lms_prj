import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function StudentDetail() {
    const {id} = useParams()
    const [today, setToday] = useState(new Date())
    const [attends, setAttends] = useState([])
    const [scores, setScores] = useState([])

    useEffect(()=>{
        
    },[id])


    return (
        <>
            <h1>StudentDetail</h1>
            <div>
                <h2>Attendance</h2>
                <div>
                    <button className="nav-btn" onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()-1, 1))}>&lt;</button>
                    <h2>{`${today.getFullYear()}년 ${today.getMonth()+1}월`}</h2>
                    <button className="nav-btn" onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()+1, 1))}>&gt;</button>
                </div>
            </div>
            <div>
                <h2>Score</h2>
            </div>
        </>
    )
}
