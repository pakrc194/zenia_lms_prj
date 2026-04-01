import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'

export default function Score() {
    const [scores, setScores] = useState([])
    const SUBJECT_ORDER = ["국어", "영어", "수학", "과학", "역사", "총점"]
    useEffect(()=>{
        const fetchScores = async () => {
            const {data} = await api.get("/student/score")

            let filtered = []

            data.map(item=>{
                if(!filtered.find(v=>v.name==item.name)) {
                    filtered.push({
                        className:item.className, 
                        grade: item.grade,
                        id: item.id,
                        name: item.name,
                        subject:[
                            {name:"총점", score:item.score, credit:item.credit},
                            {name:item.subject, score:item.score, credit:item.credit}
                        ]
                    })
                } else {
                    //console.log("find item : ", item, filtered)
                    
                    filtered = filtered.map(v=>{
                        if(v.name === item.name) {
                            v.subject.push({name:item.subject, score:item.score, credit:item.credit})
                            
                             v.subject = v.subject.map(s => 
                                s.name === "총점" ? { ...s, score: s.score+item.score, credit:s.credit+item.credit } : s
                            )
                        }
                
                        return v
                        
                    })
                    // console.log(filtered)
                }
            })
            


            setScores(filtered)
            
            // console.log(data)
            // console.log(filtered)
        }
        fetchScores()
    },[])

    return (
        <>
            <h1>Score</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>학년</th>
                            <th>반</th>
                            <th>이름</th>
                            {SUBJECT_ORDER.map((v,k)=>(<th key={k}>{v}</th>))}
                            <th>평균</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((v,k)=>(
                            <tr key={k}>
                                <td>{k+1}</td>
                                <td>{v.grade}</td>
                                <td>{v.className}</td>
                                <td>{v.name}</td>
                                {SUBJECT_ORDER.map((sj,k)=>{
                                    return <td key={k}>{v.subject.find(s=>s.name===sj).score}</td>
                                })}
                                <th>{Math.round(v.subject.find(s=>s.name==="총점").score/SUBJECT_ORDER.length-1)}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    )
}
