import { Component, OnInit } from '@angular/core';
import { AlertController, NavController,IonTabs} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  darkmode: any;
  constructor(public alert: AlertController, public navCtrl: NavController, public storage: Storage) {
    storage.create ().then(() => {
      storage.get('darkmode').then((val) => {
        console.log(`Setting status from storage to '${this.darkmode}'`);
        this.darkmode = val;
      })
    });
   }

  ngOnInit() {
  }
  toggletheme(event) {
    
    console.log( event. detail. checked);
    if (event. detail. checked)
    {
      document.body.setAttribute('color-theme','dark');
    }else{
            document.body.setAttribute('color-theme','light');
            
    }
    console.log(`changing toggleStatus to '${this.darkmode}'`);
            this.storage.set('darkmode', this.darkmode);
  }
  }