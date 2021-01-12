import { User } from '../../interface/userInterface';
const listUserInLocal = localStorage.getItem('listUser');
const listUser: User[] = listUserInLocal ? JSON.parse(listUserInLocal) : [];
// const listUser: User[] = [];
const listUserReduces = (state = listUser, action: any) => {
    switch (action.type) {
        case 'ADD_USER': {
            console.log("🚀 ~ file: user.ts ~ line 3 ~ listUserInLocal", listUserInLocal)
            if (action.payload) {
                localStorage.setItem('listUser', JSON.stringify([...state, action.payload]));
                return [...state, action.payload]
            }
            return [...state]
        }
        case 'DELETE_USER': {
            const index = state.findIndex(x => x.id === action.payload);
            state.splice(index, 1);
            return [...state]
        }
        case 'UPDATE_USER': {
            const index = state.findIndex(x => x.id === action.payload.id);
            state[index] = action.payload
            return [...state]
        }
        default: return state;
    }
}
export default listUserReduces;