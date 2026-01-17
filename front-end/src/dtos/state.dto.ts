import { ToDoDto } from "./todo.dto";
import { UserDto } from "./user.dto";

export interface PriorityDto {
    uid: string;
    name: string;
    priority: number;
}

export interface AppStateDto {
    currentUser: UserDto | null;
    myToDoList: ToDoDto[];
    searchWord: string;
    priorities: PriorityDto[];
}
