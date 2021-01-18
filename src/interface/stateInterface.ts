import { User } from "./userInterface";

export type StateInterface = {
    listUser: User[],
    dialogs: boolean,
    isUpdate: boolean,
    user: User,
    language: string
}