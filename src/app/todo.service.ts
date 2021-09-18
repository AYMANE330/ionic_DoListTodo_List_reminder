import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { log } from 'console';

const TASKS_KEY = 'tasks'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks = [];
  constructor(private storage: Storage) { 
    this.init();
    this.getAllTasks();
  }

  addTask(task) {
    this.tasks.push(task);
    this.storage.set(TASKS_KEY, this.tasks);
  }

  deleteTask(deletedTask) {
    this.tasks = this.tasks.filter((task) => {
      return task.key !== deletedTask.key;
    });
    this.storage.set(TASKS_KEY, this.tasks);
  }

  updateTask(oldTask, newTask) {
      this.tasks.forEach((task, index) => {
        if (task.key === oldTask.key) {
          this.tasks[index] = newTask;
        }
      });
      this.storage.set(TASKS_KEY, this.tasks);
  }

  getAllTasks() {
    this.storage.get(TASKS_KEY).then((tasks)=>{
      if (tasks) {
        this.tasks = tasks;
      }

      return this.tasks;
    });
  }

  removeAllTasks() {
    this.storage.set(TASKS_KEY, []).then(()=>{
      this.tasks = [];
    });
  }

  updateChecklist(checkedTask) {
    this.tasks.forEach((task, index) => {
      if (task.key === checkedTask.key) {
        this.tasks[index] = checkedTask;
      }
    });
    this.storage.set(TASKS_KEY, this.tasks);
  }


  async init() {
    await this.storage.create()
  }
}
  
