import { render, screen } from '@testing-library/react';
import UpdateTaskForm from './TaskUpdateForm';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { useTasks } from '../../hooks/useTasks';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

vi.mock('../../hooks/useTasks', () => ({
  useTasks: vi.fn(),
}));

const mockTask = {
  id: 1,
  name: 'Existing Task',
  createdAt: '2023-03-01T12:30:00Z',
  description: 'Existing description',
  status: 'To Do',
};

describe('UpdateTaskForm component', () => {
  const updateTaskMock = { mutateAsync: vi.fn() };
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTasks as ReturnType<typeof vi.fn>).mockReturnValue({
      updateTask: updateTaskMock,
    });
  });

  it('renders all form fields with initial values', () => {
    render(<UpdateTaskForm task={mockTask} onClose={onCloseMock} />);

    expect(screen.getByLabelText(/Task Name/i)).toHaveValue(mockTask.name);
    expect(screen.getByLabelText(/Task Description/i)).toHaveValue(mockTask.description);
    expect(screen.getByText(mockTask.status)).toBeInTheDocument();
  });
});
