import { User } from '../../interface/userInterface'
export const addUser = (user: User) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}
export const deleteUser = (id: number) => {
    return {
        type: 'DELETE_USER',
        payload: id
    }
}
export const deleteMultipleUser = (listId: number[]) => {
    return {
        type: 'DELETE_MULTIPLE_USER',
        payload: listId
    }
}
export const updateUser = (user: User) => {
    return {
        type: 'UPDATE_USER',
        payload: user
    }
}

export const setUpdate = (user: User) => {
    return {
        type: 'SET_UPDATE',
        payload: user
    }
}
