import { combineReducers, createStore } from 'redux';
import dialogReduces from './reducers/dialogs';
import isUpdateReduces from './reducers/isUpdate';
import langReducer from './reducers/language';
import listUserReduces from './reducers/listUser';
import userReduces from './reducers/user';

const rootReducer = combineReducers({
    listUser: listUserReduces,
    dialogs: dialogReduces,
    isUpdate: isUpdateReduces,
    user: userReduces,
    language: langReducer
});
const store = createStore(rootReducer);
export default store;