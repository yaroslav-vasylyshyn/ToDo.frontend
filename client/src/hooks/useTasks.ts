import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useTaskStore } from "../stores/store";

export const useTasks = () => {
    const tasksStore = useTaskStore()
    const queryClient = useQueryClient()

    const { data: tasks, isPending } = useQuery({
        queryKey: ['tasks', tasksStore.selectedStatus],
        queryFn: async () => {
            let url = '/tasks'
            if (tasksStore.selectedStatus !== 'All'){
                url += `?status=${tasksStore.selectedStatus}`;
            }
            const response = await agent.get<Tasks[]>(url);
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
        mutationFn: async ({ id }: { id: number }) => {
            await agent.delete(`/tasks/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });
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