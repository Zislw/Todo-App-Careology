export interface Action{
    type: eAction;
    payload?: any;
}

export enum eAction {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    USER_ADDED = "USER_ADDED",
    TASK_ADDED = "TASK_ADDED",
    ALL_TASKS_SAVED = "ALL_TASKS_SAVED",
    TASK_DELETED = "TASK_DELETED",
    TASK_UPDATED = "TASK_UPDATED",
    SEARCH = "SEARCH",
    ALL_PRIORITIES_SAVED = "ALL_PRIORITIES_SAVED"
}
