import axios from "axios";
import { UserDto } from "../../dtos/user.dto";
import { Action, eAction } from "../types/action";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const login = (user: UserDto, navTodo: Function) => {
    return async (dispatch: Function) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email: user.email,
                password: user.password
            });
            
            dispatch(userLoginned(response.data.user));
            navTodo();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Login failed');
        }
    }
}

const userLoginned = (user: UserDto): Action => {
    return {
        type: eAction.LOGIN,
        payload: user
    }
}

export const register = (user: UserDto, navTodo: Function) => {
    return async (dispatch: Function) => {
        try {
            const response = await axios.post(`${API_URL}/users/register`, {
                fullName: user.fullName,
                email: user.email,
                password: user.password
            });
            
            dispatch(saveUser(response.data.user));
            navTodo();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    }
}

const saveUser = (user: UserDto): Action => {
    return {
        type: eAction.USER_ADDED,
        payload: user
    }
}

export const logout = (): Action => {
    return {
        type: eAction.LOGOUT,
        payload: null
    }
}
