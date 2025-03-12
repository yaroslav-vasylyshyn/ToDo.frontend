import { Card, Typography } from "antd";
import './taskStyle.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTasks } from "../../hooks/useTasks";

type Props = {
    task: Tasks
    updateForm: (task: Tasks) => void
};

const statusClasses: Record<string, string> = {
    "To Do": "status-todo",
    "In progress": "status-inprogress",
    "Done": "status-done",
};

export default function Taskcard({ task, updateForm }: Props) {
    const { deleteTask } = useTasks()
    const dateObj = new Date(task.createdAt);

    const handleDelete = async () => {
        try {
            await deleteTask.mutateAsync({ id: task.id })
        } catch (error) {
            console.log("Error deleting task:", error); 
        }
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

                <EditOutlined className="edit-btn" onClick={() => updateForm(task)} />
                <DeleteOutlined className="delete-btn" onClick={handleDelete}/>
            </div>

        </Card>
    );
}
