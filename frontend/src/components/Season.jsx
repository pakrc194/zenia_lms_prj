import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'

export default function Season() {
    const navigate = useNavigate();
    const {pageNo} = useParams();

    const [seasons, setSeasons] = useState([])
    const [pageData, setPageData] = useState({cur:1, total:1, arr:[]})

    const PAGE_LIMIT = 5;
    useEffect(()=>{
        const fetchSeasons = async () => {
            const {data} = await api.get(`/season`, {
                params: {
                    pageNo: pageNo,
                    limit: PAGE_LIMIT
                }
            })
            console.log("fetchSeason", data)
            setSeasons(data)
        }
        fetchSeasons()

        const fetchSeasonsCount = async () => {
            const {data} = await api.get(`/season/count`)
            let pageTotal = Math.ceil(data/PAGE_LIMIT);
            console.log("fetchSeasonCount", data, pageTotal)
            const pageDiv = []
            for(let i=1; i<=pageTotal; i++) {
                pageDiv.push(i)
            }
            setPageData(prev=>({...prev, total:pageTotal, arr:[...pageDiv]}))
        }
        fetchSeasonsCount()
    },[pageNo])

    return (
        <>
            <h1>Season</h1>
            <div>{seasons.map(v=>(<div key={v.id} onClick={()=>navigate(`/course/${v.id}`)}>{v.name} | {v.startDate} | {v.endDate}</div>))}</div>
            <div>
                &lt;
                {pageData.arr.map(v=>(
                    <span key={v} onClick={()=>navigate(`/season/${v}`)}> {pageNo==v?`[${v}]`:v} </span>
                ))}
                &gt;
            </div>
            <div>
                <button onClick={()=>navigate("/season/insert")}>등록</button>
            </div>
        </>
    )
}
