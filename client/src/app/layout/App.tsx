import { useEffect, useState } from "react"
import Navbar from "../../components/NavBar/Navbar"
import axios from "axios"
import TasksDashboard from "../../features/tasks/TasksDashboard"
import "./styles.css"

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([])

  useEffect(() => {
    axios.get<Tasks[]>('http://localhost:5276/api/tasks')
      .then(response => setTasks(response.data))
  }, [])

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <TasksDashboard tasks={tasks} />
      </div>
    </>
  )
}

export default App
