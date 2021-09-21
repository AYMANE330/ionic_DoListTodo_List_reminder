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
  emptyList: { text: string; image: string; };
  emptyLists: { text: string; image: string; }[];

  constructor(public modalCtlr: ModalController, public todoService: TodoService, public alertController: AlertController) {
    this.getAllTask();

    this.emptyLists = [
      {
        text : ' Add Your First Todo',
        image: '../../assets/images/brain.png'
      },
      {
        text : 'What Do You Want To Get Done Today?',
        image: '../../assets/images/light.png'
      },
      {
        text : `Let's Do Your task`,
        image: '../../assets/images/gains.png'
      },
      {
        text : `Are You Ready?
		Let's Do Your Tasks`,
        image: '../../assets/images/poche.png'
      }
    ]

    this.emptyList = this.emptyLists[Math.floor(Math.random() * this.emptyLists.length)];
    
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
    this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  confirmDelete(task) {
    this.todoService.deleteTask(task);
  }

  async delete(task, item: IonItemSliding) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Confirmation !!!',
      message: 'Are You Sure You Want To Delete This <strong>Task</strong>',
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
          text: 'Delete',
          handler: () => {
            this.confirmDelete(task);
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
