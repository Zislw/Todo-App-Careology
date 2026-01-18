import axios, { AxiosRequestHeaders } from "axios";
import { Action, eAction } from "../types/action";
import { TodoDto } from "../../dtos/todo.dto";
import { PriorityDto } from "../../dtos/priority.dto";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Helper function to get headers with user ID
const getAuthHeaders = (userUid: string | null): AxiosRequestHeaders => {
  if (!userUid) return {} as AxiosRequestHeaders;
  return { 'x-user-id': userUid } as AxiosRequestHeaders;
};

export const addTask = (todo: TodoDto) => {
    return (dispatch: Function) => {
        axios.post(`${API_URL}/tasks/addTask`, todo, {
            headers: getAuthHeaders(todo.userUid || null)
        })
        .then(
            response => {
                dispatch(saveTask(response.data))
            }, err => {
                console.log(err);
            }
        )
    }
}


const saveTask = (task: TodoDto): Action => {
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
                
        axios.get(`${API_URL}/tasks/getAllTasks/${userUid}`, {
            headers: getAuthHeaders(userUid)
        }).then(
            response => {
                dispatch(saveAllTasks(response.data))
            }, err => {
                console.log(err);
            }
        )
    }
}

const saveAllTasks = (todos: TodoDto[]): Action => {
    return {
        type: eAction.ALL_TASKS_SAVED,
        payload: todos
    }
}

export const deleteTask = (taskUid: string | null, userUid?: string | null) => {
    return (dispatch: Function) => {
          if (!taskUid) {
            console.log("Task UID is null");
            return;
        }
        axios.delete(`${API_URL}/tasks/deleteTask/${taskUid}`, {
            headers: getAuthHeaders(userUid || null)
        }).then(
            response => {
                dispatch(saveDeleteTask(taskUid))
            }, err => {
                console.log(err);
            }
        )
    }
}

const saveDeleteTask = (taskUid: string): Action => {
    return {
        type: eAction.TASK_DELETED,
        payload: taskUid
    }
}

export const updateTask = (todo: TodoDto) => {
    return (dispatch: Function) => {
        axios.put(`${API_URL}/tasks/updateTask/${todo.uid}`, todo, {
            headers: getAuthHeaders(todo.userUid || null)
        }).then(
            response => {
                dispatch(saveUpdateTask(response.data))
            }, err => {
                console.log(err);
            }
        )
    }
}

const saveUpdateTask = (todo: TodoDto): Action => {
    return {
        type: eAction.TASK_UPDATED,
        payload: todo

    }
}

export const searchTask = (searchText: string): Action => {
    return {
        type: eAction.SEARCH,
        payload: searchText
    }
}

export const getAllPriorities = (userUid?: string | null) => {
    return (dispatch: Function) => {
        axios.get(`${API_URL}/tasks/priorities`, {
            headers: getAuthHeaders(userUid || null)
        }).then(
            response => {
                dispatch(saveAllPriorities(response.data))
            }, err => {
                console.log(err);
            }
        )
    }
}

export const saveAllPriorities = (priorities: PriorityDto[]): Action => {
    return {
        type: eAction.ALL_PRIORITIES_SAVED,
        payload: priorities
    }
}
