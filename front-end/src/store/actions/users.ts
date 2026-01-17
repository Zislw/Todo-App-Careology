import { UserDto } from "../../dtos/user.dto";
import { Action, eAction } from "../reducers/action";
import { authService } from "../../services/authService";

export const login = (user: UserDto, navTodo: Function) => {
    return async (dispatch: Function) => {
        try {
            const loggedInUser = await authService.login(user.email!, user.password!);
            dispatch(userLoginned(loggedInUser));
            navTodo();
        } catch (error: any) {
            alert(error.message);
        }
    }
}

export const userLoginned = (user: UserDto): Action => {
    return {
        type: eAction.USER_LOGGINED,
        payload: user
    }
}

export const register = (user: UserDto, navToDo: Function) => {
    return async (dispatch: Function) => {
        try {
            const newUser = await authService.register(
                user.email!,
                user.password!,
                user.fullName!
            );
            dispatch(saveUser(newUser));
            navToDo();
        } catch (error: any) {
            alert(error.message);
        }
    }
}

export const saveUser = (user: UserDto): Action => {
    return {
        type: eAction.USER_ADDED,
        payload: user
    }
}

export const logout = (): Action => {
    authService.logout();
    return {
        type: eAction.LOGOUT,
        payload: null
    }
}

export const initializeAuth = () => {
    return (dispatch: Function) => {
        const user = authService.getCurrentUser();
        if (user) {
            dispatch(userLoginned(user));
        }
    };
}