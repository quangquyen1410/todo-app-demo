import { combineReducers, createStore } from 'redux';
import dialogReduces from './reducers/dialogs';
import isUpdateReduces from './reducers/isUpdate';
import listUserReduces from './reducers/listUser';
import userReduces from './reducers/user';

const rootReducer = combineReducers({
    listUser: listUserReduces,
    dialogs: dialogReduces,
    isUpdate: isUpdateReduces,
    user: userReduces
});
const store = createStore(rootReducer);
export default store;