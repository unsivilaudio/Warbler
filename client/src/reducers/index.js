import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    user: userReducer,
    errors: errorReducer,
    messages: messageReducer,
});
