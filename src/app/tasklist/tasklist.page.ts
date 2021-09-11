import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, IonTabs, IonItemSliding } from '@ionic/angular';
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

  constructor(public modalCtlr: ModalController, public todoService: TodoService, public alertController: AlertController) {
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

  confirmDelete(key) {
    this.todoService.deleteTask(key);
  }

  async delete(key, item: IonItemSliding) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
              item.close();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.confirmDelete(key);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
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
