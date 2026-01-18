import { TodoDto } from "../../dtos/todo.dto";

export enum TodoMode {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update'
}

export interface TodoProps {
  item?: TodoDto;
  mode?: TodoMode;
}
