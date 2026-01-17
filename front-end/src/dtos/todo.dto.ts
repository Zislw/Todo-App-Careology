import { ePriority } from "../utils/priorityHelper";

export interface ToDoDto {
    uid?: string;
    title: string;
    dueDate: Date;
    isCompleted: boolean;
    priorityUid?: string;
    priorityName?: ePriority;
    priorityLevel?: number;
    userUid?: string;
}
