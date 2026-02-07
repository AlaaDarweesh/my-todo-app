"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    tasks = [
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
    create(title) {
        const newTask = { id: Date.now(), title, completed: false };
        this.tasks.push(newTask);
        return newTask;
    }
    remove(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return { deleted: true };
    }
    toggle(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map