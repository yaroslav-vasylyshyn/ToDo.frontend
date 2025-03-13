import { makeAutoObservable } from "mobx";

class TasksStore {
    selectedTask: Tasks | null = null;
    selectedCreateAction: boolean = false;
    selectedStatus = "All";

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

    setFilterStatus(status: string) {
        this.selectedStatus = status;
    }
}

const taskStore = new TasksStore();
export default taskStore;