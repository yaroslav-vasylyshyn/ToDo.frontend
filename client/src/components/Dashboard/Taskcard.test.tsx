import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Taskcard from './Taskcard';
import { useTaskStore } from '../../stores/store';
import { useTasks } from '../../hooks/useTasks';

// Mock the store
vi.mock('../../stores/store', () => ({
  useTaskStore: vi.fn(),
}));

// Mock the useTasks hook
vi.mock('../../hooks/useTasks', () => ({
  useTasks: vi.fn(),
}));

// Sample task data
const mockTask: Tasks = {
  id: 1,
  name: 'Test Task',
  createdAt: '2023-03-01T10:30:00Z',
  description: 'Test Description',
  status: 'To Do',
};

const selectTaskMock = vi.fn();
const deleteTaskMock = { mutateAsync: vi.fn() };

beforeEach(() => {
  vi.clearAllMocks();

  (useTaskStore as ReturnType<typeof vi.fn>).mockReturnValue({
    selectTask: selectTaskMock,
  });

  (useTasks as ReturnType<typeof vi.fn>).mockReturnValue({
    deleteTask: deleteTaskMock,
  });
});

describe('Taskcard Component', () => {
  it('renders the task details correctly', () => {
    render(<Taskcard task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Created at: 01.03.2023 12:30')).toBeInTheDocument();
  });

  it('calls selectTask when the edit icon is clicked', () => {
    render(<Taskcard task={mockTask} />);

    const editIcon = screen.getByRole('img', { name: /edit/i });
    fireEvent.click(editIcon);

    expect(selectTaskMock).toHaveBeenCalledTimes(1);
    expect(selectTaskMock).toHaveBeenCalledWith(mockTask);
  });

  it('calls deleteTask.mutateAsync when the delete icon is clicked', async () => {
    render(<Taskcard task={mockTask} />);

    const deleteIcon = screen.getByRole('img', { name: /delete/i });
    fireEvent.click(deleteIcon);

    expect(deleteTaskMock.mutateAsync).toHaveBeenCalledTimes(1);
    expect(deleteTaskMock.mutateAsync).toHaveBeenCalledWith({ id: mockTask.id });
  });
});