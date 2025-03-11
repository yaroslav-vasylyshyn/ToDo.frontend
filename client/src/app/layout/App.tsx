import { useState } from "react"
import Navbar from "../../components/NavBar/Navbar"
import "./styles.css"
import TaskForm from "../../components/Dashboard/TaskForm"
import Modal from "../../components/Dashboard/Modal"
import { Typography } from "antd"
import TasksDashboard from "../../components/Dashboard/TasksDashboard"
import { useTasks } from "../../hooks/useTasks"

function App() {
  const [createTaskForm, setCreateTaskForm] = useState(false)
  const { tasks, isPending} = useTasks()

  const handleOpenCreateForm = () => {
    setCreateTaskForm(true)
  }

  const handleCloseCreateForm = () => {
    setCreateTaskForm(false)
  }

  return (
    <>
      <Navbar createForm={handleOpenCreateForm} />
      <div className="dashboard">
        {!tasks || isPending ? <Typography> Loading...</Typography> : <TasksDashboard tasks={tasks} />}
      </div>
      <div>
      {createTaskForm && ( <Modal onClose={handleCloseCreateForm}> <TaskForm onClose={handleCloseCreateForm}/> </Modal>)}
      </div>
    </>
  )
}

export default App
