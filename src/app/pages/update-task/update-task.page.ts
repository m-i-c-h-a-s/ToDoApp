import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Task } from 'src/app/interfaces/task';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  categories: TaskCategory[]
  task: Task
  @Input() oldTask
  @Input() index

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              public databaseService: DatabaseService
  ) {
      this.loadCategories()
  }

  ngOnInit() {
    this.task = this.oldTask
  }

  async loadCategories() {
    this.categories = await this.databaseService.getCategories()
  }

  async dismiss(isTaskUpdated: boolean) {
    await this.modalController.dismiss(isTaskUpdated)
  }

  selectCategory(selectedIndex: number) {
    this.task.category = this.categories[selectedIndex].name
  }

  async updateTask() {
    if (!this.task.name)
      this.showToast("Task name can't be empty", 2000)
    else if (!this.task.priority)
      this.showToast("Select priority!", 2000)
    else if (!this.task.deadline)
      this.showToast("Set deadline!", 2000)
    else if (!this.task.category)
      this.showToast("Select category!", 2000)
    else {
      this.databaseService.updateTask(this.index, this.task)
      this.dismiss(true)
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
