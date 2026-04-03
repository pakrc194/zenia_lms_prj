import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import './Calendar.css'

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

    useEffect(() => {
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const forDate = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // 1. 상태에 넣을 빈 배열을 먼저 선언합니다.
    const newDayArr = ["일", "월", "화", "수", "목", "금", "토"];
    
    // 2. 1일 시작 전까지의 빈칸 채우기
    for (let d = 0; d < forDate.getDay(); d++) {
        newDayArr.push(0);
    }
    
    // 3. 실제 날짜 채우기
    for (let i = 1; i <= lastDate.getDate(); i++) {
        newDayArr.push(i);
    }
    
    // 4. 마지막 날 이후의 빈칸 채우기
    forDate.setDate(lastDate.getDate());
    for (let d = forDate.getDay() + 1; d <= 6; d++) {
        newDayArr.push(0);
    }
    
    // 5. 완성된 배열을 한 번에 상태 업데이트! (레이아웃 삐짐 방지)
    setDayArr(newDayArr);

    const fetchAttendMark = async () => {
        const { data } = await api.get("/attendance/month", {
            params: {
                date: new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString("en-CA")
            }
        });
        setAttendMarks(data);
    }
    fetchAttendMark();
}, [today]);

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button className="nav-btn" onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()-1, 1))}>&lt;</button>
                <h2>{`${today.getFullYear()}년 ${today.getMonth()+1}월`}</h2>
                <button className="nav-btn" onClick={()=>setToday(new Date(today.getFullYear(), today.getMonth()+1, 1))}>&gt;</button>
            </div>
            
            <div className='cal_main'>
                {dayArr.map((v, k) => {
                    const isWeekday = typeof v === 'string';
                    const isEmpty = v === 0;
                    const isSelected = 
                        !isWeekday && !isEmpty && 
                        (v === selectedStyle.day) &&
                        (today.getMonth() === selectedStyle.month) &&
                        (today.getFullYear() === selectedStyle.year);

                    return (
                        <div 
                            key={k} 
                            className={`cal_day ${isWeekday ? 'weekday' : ''} ${isEmpty ? 'empty' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                                if (isWeekday || isEmpty) return; // 요일이나 빈칸은 클릭 방지
                                
                                const dateFormat = new Date(today.getFullYear(), today.getMonth(), v).toLocaleDateString("en-CA")
                                setSelectedStyle({year: today.getFullYear(), month: today.getMonth(), day: v})
                                setSelectedDate(dateFormat)
                            }}
                        >
                            {!isEmpty && <span className="day-number">{v}</span>}
                            
                            {/* 출석 정보가 있는 경우 작은 배지로 표시 */}
                            {!isWeekday && !isEmpty && attendMark.find(m=>m.day===v) && (
                                <span className="attend-mark">
                                    👨‍🎓 {attendMark.find(m=>m.day===v)?.count}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="selected-date-info">
                Selected : <code>{selectedDate}</code>
            </div>
        </div>
    )
}