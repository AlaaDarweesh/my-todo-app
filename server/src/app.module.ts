import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module'; // أضف هذا السطر
@Module({
  imports: [TasksModule], // أضف TasksModule هنا
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
