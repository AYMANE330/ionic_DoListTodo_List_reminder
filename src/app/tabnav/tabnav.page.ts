import { Component, OnInit ,ViewChild} from '@angular/core';
import { AlertController, ModalController,IonTabs} from '@ionic/angular';
import { UpdateTaskPage } from '../update-task/update-task.page';


@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;

  constructor(public modalCtlr: ModalController) {}

  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);    
    this.selectTab = this.tabs.getSelected();
}
async addNewItem() {
  const modal = await this.modalCtlr.create({
    component: UpdateTaskPage,
  })
  modal.onDidDismiss().then(newTask =>{
  })
  return await modal.present()
}
}


