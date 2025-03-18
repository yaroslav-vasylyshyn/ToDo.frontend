import { render, screen } from '@testing-library/react';
import TasksList from './TasksList';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockTasks = [
  { id: 1, name: 'Task 1', createdAt: '2023-03-01T12:00:00Z', description: 'Description 1', status: 'To Do' },
  { id: 2, name: 'Task 2', createdAt: '2023-03-02T13:00:00Z', description: 'Description 2', status: 'Done' },
];

const queryClient = new QueryClient();

describe('TasksList component', () => {
  it('renders all provided tasks', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TasksList tasks={mockTasks} />
      </QueryClientProvider>
    );

    mockTasks.forEach(task => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });
});