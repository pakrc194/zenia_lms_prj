import { useEffect, useState } from 'react'
import api from './api/axiosInstance'

function App() {
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
        {students?.map(v=>(
          <div key={v.id}>{`${v.name}(${v.grade}-${v.className})`}</div>
        ))}
      </div>
    </>
  )
}

export default App
