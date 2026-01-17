import { AppStateDto } from "../../dtos/state.dto"
import { Action } from "./action"

const initialState: AppStateDto = {
    currentUser: null,
    myToDoList: [],
    searchWord: "",
    priorities: []
}

export const todoListReducer = (state = initialState, {type, payload}: Action) => {

    switch (type) {
        case "USER_LOGGINED":
            return {
                ...state,
                currentUser: payload
            }

        case "USER_ADDED":
            return {
                ...state,
                currentUser: payload
            };

        case "LOGOUT":
            return {
                ...state,
                currentUser: null
            }

        case "TASK_ADDED":
            return {
                ...state,
                myToDoList: [...state.myToDoList, payload]
            }

        case "ALL_TASKS_SAVED":
            return {
                ...state,
                myToDoList: [...payload]
            }

        case "TASK_DELETED":
            let arr = state.myToDoList.filter(t => t.uid !== payload)
            return {
                ...state,
                myToDoList: [...arr]
            }

        case "TASK_UPDATED":
            const updatedList = state.myToDoList.map(item => 
                item.uid === payload.uid ? payload : item
            );
            return {
                ...state,
                myToDoList: updatedList
            }

        case "SEARCH":
            return {
                ...state,
                searchWord: payload
            }

        case "ALL_PRIORITIES_SAVED":
            return {
                ...state,
                priorities: [...payload]
            }

        default:
            return state
    }

}