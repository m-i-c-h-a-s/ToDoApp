import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Task } from 'src/app/interfaces/task';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { DatabaseService } from 'src/app/services/database.service';
import categoriesData from '../../categories.json';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {

  categories: TaskCategory[] = categoriesData.categories
  task: Task

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              public databaseService: DatabaseService
    ) {
    this.task = {
      name: '',
      category: '',
      deadline: '',
      priority: '',
    }
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss()
  }

  selectCategory(selectedIndex: number) {
    this.task.category = this.categories[selectedIndex].name
  }

  async addTask() {
    if (!this.task.name)
      this.showToast("Task name can't be empty", 2000)
    else if (!this.task.priority)
      this.showToast("Select priority!", 2000)
    else if (!this.task.deadline)
      this.showToast("Set deadline!", 2000)
    else if (!this.task.category)
      this.showToast("Select category!", 2000)
    else {
      console.log(this.task)
      this.databaseService.addTask(this.task)
      this.dismiss()
    }
  }

  async showToast(toastMessage: string, durationTime: number) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: durationTime
    })
    toast.present()
  }
}
