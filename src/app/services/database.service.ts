import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TaskCategory } from '../interfaces/taskCategory';
import categoriesData from '../categories.json';
import { Task } from '../interfaces/task';


const TASKS_KEY = 'tasks'
const CATEGORIES_KEY = 'categories'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  categories: TaskCategory[] = categoriesData.categories

  constructor(private storage: Storage) {
    this.init()
    this.fillCategories()
  }

  init() {
    this.storage.create()
  }

  async fillCategories() {
    const storedData = await this.storage.get(CATEGORIES_KEY) || []
    if (storedData.length == 0) {
      this.categories.forEach(element => {
        storedData.push(element)
      });
      return this.storage.set(CATEGORIES_KEY, storedData)
    }
  }

  async getTasks() {
    return this.storage.get(TASKS_KEY) || []
  }

  async addTask(item: Task) {
    const storedData = await this.storage.get(TASKS_KEY) || []
    storedData.push(item)
    return this.storage.set(TASKS_KEY, storedData)
  }

  async deleteTask(index: number) {
    const storedData = await this.storage.get(TASKS_KEY) || []
    storedData.splice(index, 1)
    return this.storage.set(TASKS_KEY, storedData)
  }

  async updateTask(index: number, newValue: Task) {
    const storedData = await this.storage.get(TASKS_KEY) || []
    storedData[index] = newValue
    return this.storage.set(TASKS_KEY, storedData)
  }

  async getCategories() {
    return this.storage.get(CATEGORIES_KEY) || []
  }

  async addCategory(item: TaskCategory) {
    const storedData = await this.storage.get(CATEGORIES_KEY) || []
    storedData.push(item)
    return this.storage.set(CATEGORIES_KEY, storedData)
  }

  async deleteCategory(index: number) {
    const storedData = await this.storage.get(CATEGORIES_KEY) || []
    storedData.splice(index, 1)
    return this.storage.set(CATEGORIES_KEY, storedData)
  }
}
