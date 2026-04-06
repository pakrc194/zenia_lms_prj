import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function CourseInsert() {
    const navigate = useNavigate()
    const {seasonId} = useParams();
    const [subjects, setSubjects] = useState([])
    
    useEffect(()=>{
        const fetchSubjects = async () => {
            const {data} = await api.get("/subject/list")
            setSubjects(data)
        }
        fetchSubjects()
    },[])


    const fn_submit = async (e) => {
        e.preventDefault()
        const formData = e.target.form

        console.log(e, formData.name.value)

        const bodyData = {
            subjectId:formData.subject.value,
            seasonId:seasonId,
            location:formData.location.value,
            capacity:formData.capacity.value
        }

        console.log(bodyData)

        const {data} = await api.post("/course", bodyData)
        
        if(data=="fail") {
            alert("등록 실패")
        } else {
            alert("등록 완료")
            navigate(`/course/${seasonId}`)
        }

    }

    return (
        <>
            <h2>CourseInsert</h2>
            <form action="/cource" method='post' name="courceForm">
            <table border={""}>
                <tbody>
                    <tr>
                        <th>과목</th>
                        <td>
                            <select name="subject">
                                {subjects.map(v=>(<option key={v.id} value={v.id}>{v.name}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>교육실</th>
                        <td><input type="text" name="location"></input></td>
                    </tr>
                    <tr>
                        <th>수용인원</th>
                        <td><input type="number" name="capacity"></input></td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign:"right"}}>
                            <button onClick={(e)=>fn_submit(e)}>등록</button>
                            <button onClick={(e)=>{
                                e.preventDefault()
                                navigate(`/course/${seasonId}`)
                            }}>뒤로</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </form>
        </>
        
    )
}
