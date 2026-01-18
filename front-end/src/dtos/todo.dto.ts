import { ePriority } from "../utils/priorities";

export interface TodoDto {
    uid?: string;
    title: string;
    dueDate: Date;
    isCompleted: boolean;
    priorityUid?: string;
    priorityName?: ePriority;
    userUid?: string;
}
