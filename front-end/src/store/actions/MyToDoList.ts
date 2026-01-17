import axios from "axios";
import { Action, eAction } from "../reducers/action";
import { ToDoDto } from "../../dtos/todo.dto";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

//להוספת משימה לשרת
export const addTask = (todo: ToDoDto) => {
    return (dispatch: Function) => {
        axios.post(`${API_URL}/tasks/addTask`, todo).then(
            response => {
                dispatch(saveTask(response.data))
            }, err => {
                console.log(err);
            }
        )
    }

}


//לשמירת המשימה בסטייט הכללי
export const saveTask = (task: any): Action => {
    return {
        type: eAction.TASK_ADDED,
        payload: task
    }
}

export const getAllTasks = (userUid: string | null) => {
    return (dispatch: Function) => {
        if (!userUid) {
            console.log("User UID is null");
            return;
        }
        
        console.log('Fetching tasks for user:', userUid);
        
        axios.get(`${API_URL}/tasks/getAllTasks?userUid=${userUid}`).then(
            response => {
                console.log('Tasks received:', response.data);
                dispatch(saveAllTasks(response.data))
            }, err => {
                console.log("Error getting tasks:", err);
                console.log("Error details:", err.response?.data);
            }
        )
    }
}

//לשמירת כל המשימות שהתקבלו בסטייט הכללי
export const saveAllTasks = (todos: ToDoDto[]): Action => {
    return {
        type: eAction.ALL_TASKS_SAVED,
        payload: todos
    }
}

//תחיקת משימה מהשרת
export const deleteTask = (taskUid: any) => {
    return (dispatch: Function) => {
        axios.delete(`${API_URL}/tasks/deleteTask/${taskUid}`).then(
            response => {
                dispatch(saveDeleteTask(taskUid))
            }, err => {
                console.log("קרתה שגיאה", err);
            }
        )
    }
}


//שמירת המחיקה בסטייט
export const saveDeleteTask = (taskId: any): Action => {
    return {
        type: eAction.TASK_DELETED,
        payload: taskId
    }
}

//לעדכון משימה בשרת
export const updateTask = (todo: ToDoDto) => {
    return (dispatch: Function) => {
        console.log('Updating task:', todo);
        axios.put(`${API_URL}/tasks/updateTask/${todo.uid}`, todo).then(
            response => {
                console.log('Update response:', response.data);
                dispatch(saveUpdateTask(response.data))
            }, err => {
                console.log('Update error:', err);
            }
        )
    }
}

//לשמירת העדכון בסטייט הכללי
export const saveUpdateTask = (todo: ToDoDto): Action => {
    return {
        type: eAction.TASK_UPDATED,
        payload: todo

    }
}


//לפילטור המשימות לפי מילת חיפוש
export const searchTask = (word: any): Action => {
    return {
        type: eAction.SEARCH,
        payload: word
    }
}

export const getAllPriorities = () => {
    return (dispatch: Function) => {
        axios.get(`${API_URL}/tasks/priorities`).then(
            response => {
                dispatch(saveAllPriorities(response.data))
            }, err => {
                console.log("Error getting priorities:", err);
            }
        )
    }
}

export const saveAllPriorities = (priorities: any[]): Action => {
    return {
        type: eAction.ALL_PRIORITIES_SAVED,
        payload: priorities
    }
}





