import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TaskCategory } from 'src/app/interfaces/taskCategory';
import { DatabaseService } from 'src/app/services/database.service';
import { AddCategoryPage } from '../add-category/add-category.page';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.page.html',
  styleUrls: ['./manage-categories.page.scss'],
})
export class ManageCategoriesPage implements OnInit {

  categories: TaskCategory[]

  constructor(public router: Router,
              private databaseService: DatabaseService,
              public modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadCategories()
  }

  async loadCategories() {
    this.categories = await this.databaseService.getCategories()
  }

  async deleteCategory(index: number) {
    this.databaseService.deleteCategory(index)
    this.categories.splice(index, 1)
  }

  async addCategory() {
    const modal = await this.modalController.create({
      component: AddCategoryPage
    })

    modal.onDidDismiss().then(data => {
      if (data.data)
        this.loadCategories()
    })

    return await modal.present()
  }
}
