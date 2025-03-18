import { render, screen } from '@testing-library/react';
import TasksDashboard from './TasksDashboard';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockTasks = [
  { id: 1, name: 'Task 1', createdAt: '2023-03-01T12:00:00Z', description: 'Description 1', status: 'To Do' },
  { id: 2, name: 'Task 2', createdAt: '2023-03-02T13:00:00Z', description: 'Description 2', status: 'Done' },
];

const queryClient = new QueryClient();

describe('TasksDashboard component', () => {
  it('renders TasksList with provided tasks', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TasksDashboard tasks={mockTasks} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });
});
