import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function SeasonInsert() {
    const navigate = useNavigate()
    
    const fn_submit = async (e) => {
        e.preventDefault()
        const formData = e.target.form

        console.log(e, formData.name.value)

        const bodyData = {
            name: formData.name.value,
            startDate: formData.startDate.value,
            endDate: formData.endDate.value
        }

        console.log(bodyData)

        const {data} = await api.post("/season", bodyData)
        if(data=="fail") {
            alert("등록 실패")
        } else {
            alert("등록 완료")
            navigate("/course/1")
        }

    }

    return (
        <>
            <h2>SeasonInsert</h2>
            <form action="/season" method='post' name="seasonForm">
            <table border={""}>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td><input type="text" name="name"></input></td>
                    </tr>
                    <tr>
                        <th>시작날짜</th>
                        <td><input type="date" name="startDate"></input></td>
                    </tr>
                    <tr>
                        <th>종료날짜</th>
                        <td><input type="date" name="endDate"></input></td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign:"right"}}>
                            <button onClick={(e)=>fn_submit(e)}>등록</button>
                            <button onClick={(e)=>{
                                e.preventDefault()
                                navigate("/season/1")
                            }}>뒤로</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </form>
        </>
        
    )
}
