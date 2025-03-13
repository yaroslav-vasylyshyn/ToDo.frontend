import { makeAutoObservable } from "mobx";

class TasksStore {
    selectedTask: Tasks | null = null;
    selectedCreateAction: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    selectTask(task: Tasks | null) {
        this.selectedTask = task;
    }

    selectCreateAction(){
        this.selectedCreateAction = true;
    }

    resetCreateAction(){
        this.selectedCreateAction = false;
    }
}

const taskStore = new TasksStore();
export default taskStore;