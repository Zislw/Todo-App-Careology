import { AppStateDto } from "../../dtos/state.dto"
import { Action, eAction } from "../types/action"

const initialState: AppStateDto = {
    currentUser: null,
    myTodoList: [],
    searchText: "",
    priorities: []
}

export const todoListReducer = (state = initialState, {type, payload}: Action) => {

    switch (type) {
        case eAction.LOGIN:
            return {
                ...state,
                currentUser: payload
            }

        case eAction.USER_ADDED:
            return {
                ...state,
                currentUser: payload
            };

        case eAction.LOGOUT:
            return {
                ...state,
                currentUser: null
            }

        case eAction.TASK_ADDED:
            return {
                ...state,
                myTodoList: [...state.myTodoList, payload]
            }

        case eAction.ALL_TASKS_SAVED:
            return {
                ...state,
                myTodoList: [...payload]
            }

        case eAction.TASK_DELETED:
            const updatedTodoList = state.myTodoList.filter(t => t.uid !== payload)
            return {
                ...state,
                myTodoList: [...updatedTodoList]
            }

        case eAction.TASK_UPDATED:
            const updatedList = state.myTodoList.map(item => 
                item.uid === payload.uid ? payload : item
            );
            return {
                ...state,
                myTodoList: [...updatedList]
            }

        case eAction.SEARCH:
            return {
                ...state,
                searchText: payload
            }

        case eAction.ALL_PRIORITIES_SAVED:
            return {
                ...state,
                priorities: [...payload]
            }

        default:
            return state
    }
}
