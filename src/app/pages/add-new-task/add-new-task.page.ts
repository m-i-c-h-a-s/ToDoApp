import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from 'src/app/interfaces/task';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import categoriesData from '../../categories.json';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {

  categories: TaskCategory[] = categoriesData.categories
  task: Task

  constructor(public modalController: ModalController) {
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

  }
}
