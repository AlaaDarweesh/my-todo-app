import { Controller, Get, Post, Body , Delete, Param , Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

@Patch(':id/toggle')
toggle(@Param('id') id: string) {
  return this.tasksService.toggle(+id);
}
@Delete('all/clear') // مسار مختلف ليميزه عن حذف مهمة واحدة
clearAll() {
  return this.tasksService.clearAll();
}
@Delete(':id')
remove(@Param('id') id: string) {
  return this.tasksService.remove(+id); // علامة + لتحويل النص إلى رقم
}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.tasksService.create(title);
  }
}