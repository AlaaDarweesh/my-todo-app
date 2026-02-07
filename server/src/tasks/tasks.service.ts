import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    { id: 1, title: 'تعلم أساسيات React', completed: true },
    { id: 2, title: 'ربط NestJS مع React', completed: false },
  ];
  clearAll() {
  this.tasks = [];
  return { message: 'تم حذف جميع المهام' };
}

  findAll() {
    return this.tasks;
  }

  create(title: string) {
    const newTask = { id: Date.now(), title, completed: false };
    this.tasks.push(newTask);
    return newTask;
  }
  remove(id: number) {
  // نقوم بتصفية المصفوفة وحذف العنصر الذي يملك هذا الـ ID
  this.tasks = this.tasks.filter(task => task.id !== id);
  return { deleted: true };
}
toggle(id: number) {
  const task = this.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed; // قلب الحالة (true تصبح false والعكس)
  }
  return task;
}
}
