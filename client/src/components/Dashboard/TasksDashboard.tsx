import TasksList from "./TasksList"

type Props = {
    tasks: Tasks[]
    updateForm: (task: Tasks) => void
}

export default function TasksDashboard({tasks, updateForm}: Props) {
  return (
    <>
        <TasksList tasks={tasks} updateForm={updateForm}/>
    </>
  )
}
