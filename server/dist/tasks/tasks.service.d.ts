export declare class TasksService {
    private tasks;
    clearAll(): {
        message: string;
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
    remove(id: number): {
        deleted: boolean;
    };
    toggle(id: number): {
        id: number;
        title: string;
        completed: boolean;
    } | undefined;
}
