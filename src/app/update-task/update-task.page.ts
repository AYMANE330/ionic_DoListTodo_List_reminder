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
    const key = this.itemName + this.itemDueDate

    this.newTaskObj = {
      key: key,
      value:{
        itemName:this.itemName,
        itemDueDate:this.itemDueDate,
        itemPriority:this.itemPriority
      }
    }

    console.log(this.newTaskObj);
    if(key){
      await this.todoService.addTask(this.newTaskObj)
    }else{
      console.log("can't save empty task");
    }
    this.dismis()
  }
  
  async update(){
    console.log("this.task", this.task);
    console.log("this.newTaskObj", this.newTaskObj);

    this.newTaskObj = {
      key: this.task.key,
      value:{
        itemName:this.itemName,
        itemDueDate:this.itemDueDate,
        itemPriority:this.itemPriority
      }
    }
  
    await this.todoService.updateTask(this.task, this.newTaskObj)
    this.dismis()
  }
  

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }
}
