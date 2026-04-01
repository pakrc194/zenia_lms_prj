import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'

export default function Student() {
  const [students, setStudents] = useState([])

  useEffect(()=>{
    const fetchStudents = async () => {
        const {data} = await api.get("/student/list")
        setStudents(data)
        console.log(data)
    }
    fetchStudents()
  },[])

  return (
    <>
        <h1>Student</h1>
        <div>
            <table>
            <thead>
                <tr>
                <th>번호</th>
                <th>학년</th>
                <th>반</th>
                <th>이름</th>
                </tr>
            </thead>
            <tbody>
                {students?.map((v,k)=>(
                <tr key={v.id}>
                    <td>{k+1}</td>
                    <td>{v.grade}</td>
                    <td>{v.className}</td>
                    <td>{v.name}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </>
  )
}
