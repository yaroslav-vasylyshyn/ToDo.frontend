import TaskCard from './Taskcard';
import './taskStyle.css';

type Props = {
    tasks: Tasks[]
}

export default function TasksList({ tasks }: Props) {

    return (
        <div className="tasks-list">
            {tasks.map(task => {
                return <TaskCard key={task.id} task={task} />
            })}
        </div>
    )
}