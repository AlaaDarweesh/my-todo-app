import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    toggle(id: string): {
        id: number;
        title: string;
        completed: boolean;
    } | undefined;
    clearAll(): {
        message: string;
    };
    remove(id: string): {
        deleted: boolean;
    };
    findAll(): {
        id: number;
        title: string;
        completed: boolean;
    }[];
    create(title: string): {
        id: number;
        title: string;
        completed: boolean;
    };
}
