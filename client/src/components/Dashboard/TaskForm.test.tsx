import { render, screen } from '@testing-library/react';
import TaskForm from './TaskForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('TaskForm component', () => {
  const createTaskMock = { mutateAsync: vi.fn() };
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTasks as ReturnType<typeof vi.fn>).mockReturnValue({
      createTask: createTaskMock,
    });
  });

  it('renders all form fields correctly', () => {
    render(<TaskForm onClose={onCloseMock} />);

    expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
});