import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useTasks = () => {
    const queryClient = useQueryClient()

    const { data: tasks, isPending } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await agent.get<Tasks[]>('/tasks');
            return response.data;
        }
    })

    const createTask = useMutation({
        mutationFn: async (task: Tasks) => {
            await agent.post('tasks', task)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })

    const updateTask = useMutation({
        mutationFn: async (task: any) => {
            const { name, description, createdAt, status } = task;
            await agent.put(`tasks/${task.id}`, { name, description, createdAt, status });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
        }
    });

    const deleteTask = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            await agent.delete(`/api/tasks/${id}`);
        }
    });
    
    

    return{
        tasks,
        isPending,
        createTask,
        updateTask,
        deleteTask
    }
}