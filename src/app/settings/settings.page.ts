import { Component, OnInit } from '@angular/core';
import { AlertController, NavController,IonTabs, IonItemSliding} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ThemeService } from '../theme.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  darkvalue: any;
  constructor(private themeService : ThemeService, public todoService: TodoService, public alertController: AlertController) {}

  
  get darkboolean() {
    return this.themeService.dark;
  }
  ngOnInit() {
    this.darkvalue = this.darkboolean;
    console.log(this.darkvalue);
  }
  setThem(ev){
    console.log('ev.detail.checked', ev.detail.checked);
    this.themeService.setAppTheme(ev.detail.checked);
  }
  restAllTasks(){
  this.todoService.removeAllTasks()

}
async delete() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirmation Reset  !!!',
    message: 'Are You Sure You Want To Delete All<strong>Tasks</strong>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Reset',
        handler: () => {
          this.restAllTasks();
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
}
  }