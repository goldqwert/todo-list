import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todoListReducer from './TodoListsReducer';
import loginReducer from './AuthReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    app: todoListReducer,
    auth: loginReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
