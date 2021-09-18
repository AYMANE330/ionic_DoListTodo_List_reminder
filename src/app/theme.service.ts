import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';


const THEME_KEY ='selected-app-theme';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  dark: boolean;
  constructor(private storage: Storage) {
    this.storage.create();
    this.storage.get(THEME_KEY).then((val)=>{
      console.log('val',val);
      this.dark = val;
      if (this.dark){
        document.body.classList.add('dark');
      }else{
        document.body.classList.remove('dark');
      }
    });
  
  }
  
     

  setAppTheme(dark) {
    this.dark = dark;
    if (dark){
      document.body.classList.add('dark');
    }else{
      document.body.classList.remove('dark');
    }
    this.storage.set(THEME_KEY , dark);
  }
 
}
