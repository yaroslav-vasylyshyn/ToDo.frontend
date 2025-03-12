import { useState } from "react"
import Navbar from "../../components/NavBar/Navbar"
import "./styles.css"
import TaskForm from "../../components/Dashboard/TaskForm"
import Modal from "../../components/Dashboard/Modal"
import { Typography } from "antd"
import TasksDashboard from "../../components/Dashboard/TasksDashboard"
import { useTasks } from "../../hooks/useTasks"
import TaskUpdateForm from "../../components/Dashboard/TaskUpdateForm"

function App() {
  const [createTaskForm, setCreateTaskForm] = useState(false)
  const [updateTaskForm, setUpdateTaskForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);

  const { tasks, isPending } = useTasks()

  const handleOpenCreateForm = () => {
    setCreateTaskForm(true)
  }

  const handleCloseCreateForm = () => {
    setCreateTaskForm(false)
  }

  const handleOpenUpdateForm = (task: Tasks) => {
    setSelectedTask(task)
    setUpdateTaskForm(true)
  }

  const handleCloseUpdateForm = () => {
    setSelectedTask(null);
    setUpdateTaskForm(false)
  }

  return (
    <>
      <Navbar createForm={handleOpenCreateForm} />
      <div className="dashboard">
        {!tasks || isPending ? <Typography> Loading...</Typography> : <TasksDashboard tasks={tasks} updateForm={handleOpenUpdateForm}/>}
      </div>
      <div>
        {createTaskForm && (<Modal onClose={handleCloseCreateForm}> <TaskForm onClose={handleCloseCreateForm} /> </Modal>)}
      </div>
      <div>
        {updateTaskForm && selectedTask && (<Modal onClose={handleCloseUpdateForm}> <TaskUpdateForm onClose={handleCloseUpdateForm} task={selectedTask}/> </Modal>)}
      </div>
    </>
  )
}

export default App
