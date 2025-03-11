import Taskcard from './Taskcard';
import './taskStyle.css';

type Props = {
    tasks: Tasks[]
}

export default function TasksList({ tasks }: Props) {

    return (
        <div className="tasks-list">
            {tasks.map(task => {
                return <Taskcard key={task.id} task={task} />
            })}
        </div>
    )
}