import Taskcard from './Taskcard';
import './taskStyle.css';

type Props = {
    tasks: Tasks[]
    updateForm: (task: Tasks) => void
}

export default function TasksList({ tasks, updateForm }: Props) {

    return (
        <div className="tasks-list">
            {tasks.map(task => {
                return <Taskcard key={task.id} task={task} updateForm={updateForm}/>
            })}
        </div>
    )
}