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
        

    },[season])

    const fn_regist = async (course) => {
        const studentId = 1;

        const bodyData = {
            studentId: studentId,
            courseId: course.id,
        }

        const {data} = await api.post("/courseRegister", bodyData)
        console.log("fn_regist",data)
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
                if(prev[course.id]) {
                    return [...prev, {[course.id]:[data]}]
                } else {
                    return prev.push()
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
                        {v.subject.name} | {v.subject.teacher} | {v.location} | (0/{v.capacity}) |<button onClick={()=>fn_regist(v)}>신청</button> | <button onClick={()=>fn_status(v)}>현황</button>
                        {(isStatusOpen[v.id]!=null || isStatusOpen[v.id]==true) && <div>
                            {registerList[v.id] && registerList[v.id].map((v,k)=><div v={k}>{v.student.name}|{v.createAt}</div>)}
                        </div>}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={()=>navigate(`/course/${seasonId}/insert`)}>등록</button>
            </div>
        </>
        
    )
}
