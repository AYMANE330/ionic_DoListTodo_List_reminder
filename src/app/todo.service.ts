import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

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

  async addTask(task) {
    this.tasks.push(task);
    this.storage.set(TASKS_KEY, this.tasks);
    this.setNotif(task)

  }

  deleteTask(deletedTask) {
    this.tasks = this.tasks.filter((task) => {
      return task.key !== deletedTask.key;
    });
    this.deleNotif([deletedTask]);
    this.storage.set(TASKS_KEY, this.tasks);
  }

  updateTask(oldTask, newTask) {
    this.tasks.forEach((task, index) => {
      if (task.key === oldTask.key) {
        this.tasks[index] = newTask;
      }
    });
    this.storage.set(TASKS_KEY, this.tasks);
    this.setNotif(newTask)
  }

  getAllTasks() {
    this.storage.get(TASKS_KEY).then((tasks) => {
      if (tasks) {
        this.tasks = tasks;
      }

      return this.tasks;
    });
  }

  removeAllTasks() {
    
    this.storage.set(TASKS_KEY, []).then(() => {
      this.deleNotif(this.tasks);
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

  async setNotif(task) {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: task.value.itemName,
          body: '',
          id: task.key,
          schedule: { at: new Date(new Date(task.value.itemDueDate).setSeconds(0)) }
        },
      ],
    });
    console.log(new Date(task.value.itemDueDate));

  }

  async deleNotif(taskArray) {

    const ids = taskArray.map((item)=>{
      return {id:item.key}
    });
  
    const notifs = await LocalNotifications.cancel({
      notifications: ids
    });
  
  
  }
}
