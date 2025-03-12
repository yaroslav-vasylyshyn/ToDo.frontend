import { Form, Input, Button, Select } from "antd"
import "./UpdateTaskForm.css"
import { useTasks } from "../../hooks/useTasks"
import { useEffect } from "react"

type Props = {
    task: Tasks
    onClose: () => void
}

export default function TaskForm({ task, onClose }: Props) {
    const [form] = Form.useForm()
    const {updateTask} = useTasks()

    useEffect(() => {
        form.setFieldsValue({
            name: task.name,
            description: task.description,
            status: task.status
        });
    }, [task, form]);

    const onFinish = async (values: any) => {
        const updatedValues = {
            ...values,
            id: task.id,            
            createdAt: task.createdAt 
        };
        await updateTask.mutateAsync(updatedValues);
        onClose()
    }

    return (
        <div className="form-main-div">
            <Form className="form" form={form} onFinish={onFinish} layout="vertical" name="createform">

                <Form.Item
                    label="Task Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter a name" },
                            { min: 2, message: "Task name must be at least 2 characters long" },
                            { max: 255, message: "Task name cannot be more than 255 characters long" }]}>
                    <Input placeholder="Enter task name" />
                </Form.Item>

                <Form.Item
                    label="Task Description"
                    name="description"
                    rules={[{ required: true, message: "Please enter a description" },
                            { min: 2, message: "Task description must be at least 2 characters long" },
                            { max: 255, message: "Task description cannot be more than 500 characters long" }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter task description" />
                </Form.Item>

                <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status" }]}>
                    <Select placeholder="Select status" >
                        <Select.Option value="To Do">To Do</Select.Option>
                        <Select.Option value="In progress">In Progress</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button className="submit-btn" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
