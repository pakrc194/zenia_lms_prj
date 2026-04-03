import { useEffect, useState } from 'react'
import api from './api/axiosInstance'
import Student from './components/Student'
import Subject from './components/Subject'
import Score from './components/Score'
import Attendance from './components/Attendance'
import Chat from './components/Chat'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import StudentDetail from './components/StudentDetail'


function App() {
  const navs = [{title:"Attendance", path:"/attend"},
    {title:"Student", path:"/student"},
    {title:"Subject", path:"/subject"},
    {title:"Score", path:"/score"},
    {title:"Chat", path:"/chat"},]
  const [selectedNav, setSelectedNav] = useState(navs[0])
  const currentUser = "User"+(Math.random()*100).toFixed(0)
  return (
    <>
      <div>
        {navs.map((v,k)=><span key={k} onClick={()=>location.href=`${v.path}`}>{v.title} | </span>)}
      </div>
      <BrowserRouter>
        <Routes>
          <Route index element={<div>lms</div>}/>
          <Route path="attend" element={<Attendance/>}/>
          <Route path="student" element={<Student/>}/>
          <Route path="student/:id" element={<StudentDetail/>}/>
          <Route path="subject" element={<Subject/>}/>
          <Route path="score" element={<Score/>}/>
          <Route path="chat" element={<Chat
            roomId="room1"
            currentUser={currentUser}/>}/>
        </Routes>
      </BrowserRouter>
      {/* 
      {selectedNav==="Attendance" && <Attendance/>}
      {selectedNav==="Student" && <Student/>}
      {selectedNav==="Subject" && <Subject/>}
      {selectedNav==="Score" && <Score/>}
      {selectedNav==="Chat" && <Chat
            roomId="room1"
            currentUser={currentUser}/>} */}
    </>
  )
}

export default App

