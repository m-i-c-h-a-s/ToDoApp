import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const TASKS_KEY = 'tasks'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private storage: Storage) {
    this.init()
  }

  init() {
    this.storage.create()
  }

  getTasks() {
    return this.storage.get(TASKS_KEY) || []
  }

  async addTask(item) {
    const storedData = await this.storage.get(TASKS_KEY) || []
    storedData.push(item)
    return this.storage.set(TASKS_KEY, storedData)
  }

  async deleteTask(index) {
    const storedData = await this.storage.get(TASKS_KEY) || []
    storedData.splice(index, 1)
    return this.storage.set(TASKS_KEY, storedData)
  }

  async updateTask(index, newValue) {
    const storedData = await this.storage.get(TASKS_KEY) || []
    storedData[index] = newValue
    return this.storage.set(TASKS_KEY, storedData)
  }
}
