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

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async addTask() {
    const modal = await this.modalController.create({
      component: AddNewTaskPage
    })

    return await modal.present()
  }

  async updateTask() {
    const modal = await this.modalController.create({
      component: UpdateTaskPage
    })

    return await modal.present()
  }
}
