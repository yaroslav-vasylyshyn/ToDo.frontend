import { describe, it, expect, beforeEach } from 'vitest';
import taskStore from './TasksStore';

const mockTask = {
  id: 1,
  name: 'Test Task',
  createdAt: '2023-03-01T10:30:00Z',
  description: 'Test Description',
  status: 'To Do',
};

describe('TasksStore', () => {
  beforeEach(() => {
    taskStore.selectTask(null);
    taskStore.resetCreateAction();
    taskStore.setFilterStatus('');
  });

  it('has correct default state', () => {
    expect(taskStore.selectedTask).toBeNull();
    expect(taskStore.selectedStatus).toBe('');
    expect(taskStore.selectedTask).toBeNull();
  });

  it('sets and resets selectedTask correctly', () => {
    taskStore.selectTask(mockTask);
    expect(taskStore.selectedTask).toEqual(mockTask);

    taskStore.selectTask(null);
    expect(taskStore.selectedTask).toBeNull();
  });

  it('sets and resets create action correctly', () => {
    taskStore.selectCreateAction();
    expect(taskStore.selectedCreateAction).toBe(true);

    taskStore.resetCreateAction();
    expect(taskStore.selectedCreateAction).toBe(false);
  });

  it('sets filter status correctly', () => {
    taskStore.setFilterStatus('Done');
    expect(taskStore.selectedStatus).toBe('Done');
  });
});
