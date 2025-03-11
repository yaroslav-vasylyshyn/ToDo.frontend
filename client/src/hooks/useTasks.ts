import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

    return{
        tasks,
        isPending,
        createTask
    }
}