import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { TaskCategory } from '../../interfaces/taskCategory';
import categoriesData from '../../categories.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  today: number = Date.now()
  categories: TaskCategory[] = categoriesData.categories
  toDoList = []

  constructor(
    public modalController: ModalController,
    private databaseService: DatabaseService
  ) {
    this.loadData()
  }

  async loadData() {
    this.toDoList = await this.databaseService.getTasks()
  }

  async addTask() {
    const modal = await this.modalController.create({
      component: AddNewTaskPage
    })

    modal.onDidDismiss().then(data => {
      this.loadData()
    })
    return await modal.present()
  }

  async updateTask(index, oldTask) {
    const modal = await this.modalController.create({
      component: UpdateTaskPage,
      componentProps: {index: index, oldTask: oldTask}
    })

    modal.onDidDismiss().then(data => {
      this.loadData()
    })
    return await modal.present()
  }

  async deleteTask(index) {
    this.databaseService.deleteTask(index)
    this.toDoList.splice(index, 1)
  }
}
