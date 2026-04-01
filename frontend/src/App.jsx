import { useEffect, useState } from 'react'
import api from './api/axiosInstance'
import Student from './components/Student'
import Subject from './components/Subject'
import Score from './components/Score'
import Attendance from './components/Attendance'

function App() {
  const navs = ["Attendance", "Student", "Subject", "Score"]
  const [selectedNav, setSelectedNav] = useState(navs[0])
  return (
    <>
      <div>
        {navs.map((v,k)=><span key={k} onClick={()=>setSelectedNav(v)}>{v} | </span>)}
      </div>
      {selectedNav==="Attendance" && <Attendance/>}
      {selectedNav==="Student" && <Student/>}
      {selectedNav==="Subject" && <Subject/>}
      {selectedNav==="Score" && <Score/>}
    </>
  )
}

export default App
