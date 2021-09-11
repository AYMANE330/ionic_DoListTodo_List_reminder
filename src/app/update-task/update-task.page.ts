import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  newTaskObj = {};
  todoList = [];
  itemName
  itemDueDate 
  itemPriority
  

  constructor(public modalCtlr: ModalController, public todoService:TodoService) {
   }

  ngOnInit() {

    this.itemName = this.task?.value?.itemName;
    this.itemDueDate = this.task?.value?.itemDueDate;
    this.itemPriority = this.task?.value?.itemPriority;
    if (!this.itemDueDate) {
      this.itemDueDate= new Date().toISOString();
    }
    
    if (!this.itemPriority) {
      this.itemPriority='low';
    }

  }
  
  async add(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority})
    console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate
    if(uid){
      await this.todoService.addTask(uid,this.newTaskObj)

    }else{
      console.log("can't save empty task");
    }
    this.dismis()
  }
  
  async update(){
    console.log("this.task", this.task);
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority})
    // this.newTaskObj = this.task;
    let uid = this.task.key
    await this.todoService.updateTask(uid,this.newTaskObj)
    this.dismis()
  }
  

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }
}
