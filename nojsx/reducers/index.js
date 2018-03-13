const {combineReducers} = Redux;
import todos from './todos.js';

export default combineReducers({todos, /*next others*/})