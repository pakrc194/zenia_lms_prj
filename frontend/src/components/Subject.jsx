import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'

export default function Subject() {
    const [subjects, setSubjects] = useState([])
    
    useEffect(()=>{
        const fetchSubjects = async () => {
           const {data} = await api.get("/subject/list") 
           setSubjects(data)
        }
        fetchSubjects()
        
    },[])

    return (
        <>
            <h1>Subject</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>과목명</th>
                            <th>담당 교사</th>
                            <th>학점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((v,k)=>(
                            <tr key={v.id}>
                                <td>{k+1}</td>
                                <td>{v.name}</td>
                                <td>{v.teacher}</td>
                                <td>{v.credit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    )
}
