import { User } from "../../interface/userInterface"

const initialUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    fullName: '',
    phone: '',
    position: 0,
    birthDt: ''
}
const userReduces = (state: User = initialUser, action: any) => {
    if (action.type === 'SET_UPDATE') {
        return { ...state, ...action.payload }
    }
    return state;
}
export default userReduces;