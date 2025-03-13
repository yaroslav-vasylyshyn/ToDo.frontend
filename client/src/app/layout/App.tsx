import { useState } from "react"
import Navbar from "../../components/NavBar/Navbar"
import "./styles.css"
import TaskForm from "../../components/Dashboard/TaskForm"
import Modal from "../../components/Dashboard/Modal"
import { Typography } from "antd"
import TasksDashboard from "../../components/Dashboard/TasksDashboard"
import { useTasks } from "../../hooks/useTasks"
import TaskUpdateForm from "../../components/Dashboard/TaskUpdateForm"
import { observer } from "mobx-react-lite";
import { useTaskStore } from "../../stores/store";

const App = observer(() => {
  const taskStore = useTaskStore();
  const { tasks, isPending } = useTasks()

  return (
    <>
      <Navbar />
      <div className="dashboard">
        {!tasks || isPending ? <Typography> Loading...</Typography> : <TasksDashboard tasks={tasks}/>}
      </div>
      <div>
        {taskStore.selectedCreateAction && (<Modal onClose={() => taskStore.resetCreateAction()}> <TaskForm onClose={() => taskStore.resetCreateAction()} /> </Modal>)}
      </div>
      <div>
      {taskStore.selectedTask && (
        <Modal onClose={() => taskStore.selectTask(null)}>
          <TaskUpdateForm task={taskStore.selectedTask} onClose={() => taskStore.selectTask(null)} />
        </Modal>)}
      </div>
    </>
  )
})

export default App
