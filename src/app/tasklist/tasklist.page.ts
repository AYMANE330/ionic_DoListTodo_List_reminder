import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, IonTabs } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage {
  todoList = []

  today: number = Date.now();

  constructor(public modalCtlr: ModalController, public todoService: TodoService) {
    this.getAllTask()
  }

  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
    })
    // modal.onDidDismiss().then(newTask => {
    //   this.getAllTask()
    // })
    return await modal.present()
  }

  getAllTask() {
    this.todoList = this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  delete(key) {
    this.todoService.deleteTask(key);
  }

  async update(selectedTask) {
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask }
    })

    return await modal.present()
  }
  updateChecklist(item) {
    this.todoService.updateChecklist(item)
  }

}
