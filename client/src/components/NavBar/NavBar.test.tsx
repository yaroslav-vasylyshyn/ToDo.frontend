import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import taskStore from '../../stores/TasksStore';

vi.mock('../../stores/TasksStore', () => ({
  __esModule: true,
  default: {
    selectCreateAction: vi.fn(),
  },
}));

describe('Navbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Navbar with logo, StatusFilter, and Add Task button', () => {
    render(<Navbar />);

    expect(screen.getByText(/To Do App/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  it('calls selectCreateAction from taskStore when Add Task button is clicked', () => {
    render(<Navbar />);
  
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);
  
    expect(taskStore.selectCreateAction).toHaveBeenCalledTimes(1);
  });
  
});