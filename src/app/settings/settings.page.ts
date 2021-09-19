import { Component, OnInit } from '@angular/core';
import { AlertController, NavController,IonTabs} from '@ionic/angular';
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
  constructor(private themeService : ThemeService, public todoService: TodoService) {}

  
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

  }