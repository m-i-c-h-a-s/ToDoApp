import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {

  category: TaskCategory
  colors = ["primary", "secondary", "tertiary", "success", "warning", "danger", "medium", "dark"]

  constructor(public modalController: ModalController,
              private databaseService: DatabaseService,
              public toastController: ToastController
  ) {
    this.category = {
      name: '',
      labelColor: ''
    }
  }

  ngOnInit() {
  }

  async dismiss(isCategoryAdded: boolean) {
    await this.modalController.dismiss(isCategoryAdded)
  }

  selectLabelColor(selectedIndex: number) {
    this.category.labelColor = this.colors[selectedIndex]
  }

  async addCategory() {
    if (!this.category.name)
      this.showToast("Category name can't be empty!", 2000)
    else if (!this.category.labelColor)
      this.showToast("Select label color!", 2000)
    else {
      this.databaseService.addCategory(this.category)
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
