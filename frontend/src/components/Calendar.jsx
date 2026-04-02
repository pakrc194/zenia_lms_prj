import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'


export default function Calendar({setAttendances, selectedDate, setSelectedDate, attendMark, setAttendMarks}) {
    const [today, setToday] = useState(new Date())
    const [dayArr, setDayArr] = useState(["일","월","화","수","목","금","토"])
    const [selectedStyle, setSelectedStyle] = useState({year:new Date().getFullYear(), month:new Date().getMonth(),day:new Date().getDate()});


    useEffect(()=>{
        const fetchAttendance = async () => {
            const {data} = await api.get("/attendance/list",{
                params:{
                    date:selectedDate
                }
            })
            setAttendances(data)
            console.log(data)
        }
        fetchAttendance()
    },[selectedDate])


    useEffect(()=>{
        setDayArr(["일","월","화","수","목","금","토"])
        const lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0)
        const forDate = new Date(today.getFullYear(), today.getMonth(), 1)
        
        //console.log(lastDate.getDate(), forDate)
        
        for(let i=1; i<=lastDate.getDate(); i++) {
            forDate.setDate(i)
            if(i==1) {
                for(let d=0; d<forDate.getDay(); d++) {
                    //dayArr.push(0)
                    setDayArr(prev=>[...prev, 0])
                }
            }
            //dayArr.push(i)
            setDayArr(prev=>[...prev, i])
            if(i==lastDate.getDate()) {
                for(let d=forDate.getDay(); d<6; d++) {
                    //dayArr.push(0)
                    setDayArr(prev=>[...prev, 0])
                }
            }
        }

        const fetchAttendMark = async () => {
            const {data} = await api.get("/attendance/month", {
                params:{
                    date:new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString("en-CA")
                }
            })
            console.log(data)
            setAttendMarks(data)
        }
        fetchAttendMark()
        //console.log(dayArr)
    },[today])

    return (
        <>
            <h2>
                <button onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()-1, 1))}>&lt;</button>
                    {`${today.getFullYear()}년 ${today.getMonth()+1}월`}
                <button onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()+1, 1))}>&gt;</button>
            </h2>
            <div className='cal_main'>
                {dayArr.map((v,k)=>{
                    return <div key={k} className='cal_day'
                                style={
                                    (v==selectedStyle.day) &&
                                    (today.getMonth()==selectedStyle.month) &&
                                    (today.getFullYear()==selectedStyle.year) ? 
                                    {backgroundColor:'#faa', color:'#333'}:{}
                                } 
                                onClick={()=>{
                                    const dateFormat = new Date(today.getFullYear(), today.getMonth(), v).toLocaleDateString("en-CA")
                                    // console.log(dateFormat)
                                    setSelectedStyle({year: today.getFullYear(), month: today.getMonth(), day: v})
                                    return setSelectedDate(dateFormat)
                                }
                            }>
                                {v!=0 && v}
                                {attendMark.find(m=>m.day===v) && `👨‍🎓${attendMark.find(m=>m.day===v)?.count}`}
                            </div>
                })}
            </div>
            <div>
                selected : {`${selectedDate}`}
            </div>
        </>
    )
}
