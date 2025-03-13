import TasksList from "./TasksList"

type Props = {
    tasks: Tasks[]
}

export default function TasksDashboard({tasks}: Props) {
  return (
    <>
        <TasksList tasks={tasks} />
    </>
  )
}
