import { PriorityDto } from "./priority.dto";
import { TodoDto } from "./todo.dto";
import { UserDto } from "./user.dto";

export interface AppStateDto {
    currentUser: UserDto | null;
    myTodoList: TodoDto[];
    searchText: string;
    priorities: PriorityDto[];
}
