import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks2 = [];
  constructor(private storage: Storage) {
    this.init();
    this.getAllTasks();
  }

  addTask(key, value) {
    this.storage.set(key, value).then((obj) => {
      this.tasks2.push({ key, value: obj })
    });
  }

  deleteTask(key) {
    this.storage.remove(key).then(() => {
      this.tasks2 = this.tasks2.filter((obj) => {
        return obj.key !== key;
      });
    });
  }

  updateTask(key, newValue) {
    this.storage.set(key, newValue).then((val) => {
      this.tasks2.forEach((obj, index) => {
        if (obj.key === key) {
          this.tasks2[index] = { key, value: val }
        }
      });
    });
  }

  getAllTasks() {
    let tasks: any = []
    this.storage.forEach((key, value, index) => {
      if (value !== 'darkmode') {
        tasks.push({ 'value': value, 'key': key })
      }
    });
    this.tasks2 = tasks
    return tasks
  }
<<<<<<< HEAD


  updateChecklist(item) {
    this.storage.set(item.key, item.value);
  }
  async init() {
    await this.storage.create()
  }


=======
updateChecklist(item) {
    this.storage.set(item.key, item.value);
  }
  async init() {
    await this.storage.create()
  }

  
>>>>>>> fad5dd1d15f729a65be1993209bce31693fed0fe
}
