import { Card, Typography } from "antd";
import './taskStyle.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTasks } from "../../hooks/useTasks";
import { useTaskStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

type Props = {
    task: Tasks
};

const statusClasses: Record<string, string> = {
    "To Do": "status-todo",
    "In progress": "status-inprogress",
    "Done": "status-done",
};

const Taskcard = observer(({ task }: Props) => {
    const taskStore = useTaskStore();
    const { deleteTask } = useTasks()
    const dateObj = new Date(task.createdAt);

    const handleDelete = async () => {
        try {
            await deleteTask.mutateAsync({ id: task.id })
        } catch (error) {
            console.log("Error deleting task:", error); 
        }
    };

    const handleEdit = () => {
        taskStore.selectTask(task);
    };

    const formattedDateTime =
        `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}
         ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;

    return (
        <Card className="task-card">
            <Typography className="task-name"> {task.name} </Typography>
            <Typography className="task-date"> Created at: {formattedDateTime} </Typography>
            <Typography className="task-description"> {task.description} </Typography>
            <div className="task-footer">
                <div className={`task-status ${statusClasses[task.status]}`}>
                    {task.status}
                </div>

                <EditOutlined className="edit-btn" onClick={handleEdit} />
                <DeleteOutlined className="delete-btn" onClick={handleDelete}/>
            </div>

        </Card>
    );
})

export default Taskcard;