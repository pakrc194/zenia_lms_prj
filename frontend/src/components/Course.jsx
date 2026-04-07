import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'

export default function Course() {
    const {seasonId} = useParams()
    const navigate = useNavigate()

    const [season, setSeason] = useState({})
    const [courses, setCourses] = useState([])

    const [registerList, setRegisterList] = useState([])
    const [isStatusOpen, setIsStatusOpen] = useState({0:false})

    
    useEffect(()=>{
        const fetchSeason = async () => {
            const {data} = await api.get(`/season/${seasonId}`)
            setSeason(data)
            console.log("fetchSeason", data)
        }
        fetchSeason();

    },[seasonId])

    useEffect(()=>{
        const fetchCourses = async () => {
            const {data} = await api.get(`/course/${seasonId}`)

            setCourses(data)
            console.log("fetchCourses", data)
        }
        fetchCourses()
        

    },[season, registerList])

    const fn_regist = async (course) => {
        const studentId = Math.ceil(Math.random()*10);

        const bodyData = {
            studentId: studentId,
            courseId: course.id,
        }

        const {data} = await api.post("/courseRegister", bodyData)
        console.log("fn_regist",data)
        if(data==null || data=="") {
            alert("신청 실패")
        } else {
            alert("신청 성공")
            //navigate(0)
        }
        
    }

    const fn_status = async (course) => {
        if(isStatusOpen[course.id]==null || isStatusOpen[course.id]==false) {
            const {data} = await api.get("/course/student/list", {
                params: {
                    courseId: course.id
                }
            })
            console.log("fn_status",data)

            setRegisterList(prev=>{
                console.log("prev",prev)
                if(prev[course.id]) {
                    prev[course.id] = data
                    return prev
                } else {
                    return {...prev, [course.id]:data}
                }
            })
            
            setIsStatusOpen(prev=>({...prev, [course.id]:true}))
        } else {
            setIsStatusOpen(prev=>({...prev, [course.id]:false}))
        }
        
    }
 
    
    return (
        <>
            <h1>{season.name}</h1>
            <div>
                {courses.map(v=>(
                    <div key={v.id}>
                        {v.subject} | {v.teacher} | {v.location} | ({v.status}/{v.capacity}) |<button onClick={()=>fn_regist(v)}>신청</button> | <button onClick={()=>fn_status(v)}>현황</button>
                        {(isStatusOpen[v.id]==true) && <div>
                            {registerList[v.id] && registerList[v.id].map((v,k)=><div key={k}>{v.student.sid} | {v.student.name} | {v.createAt}</div>)}
                        </div>}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={()=>navigate(`/course/${seasonId}/insert`)}>등록</button>
                <button onClick={()=>navigate(`/season/1`)}>목록</button>
            </div>
        </>
        
    )
}
