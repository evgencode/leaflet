import {
  SET_VISIBILITY_FILTER,
  TODO_DONE,
  TODO_DELETE,
  SWITCH_TYPE,
  ADD_TODO
} from '../actions/todos.js';

const initialState = {
  showType: 'all',
  items: [
    {id: 1, name: 'Todo 1', isDone: false},
    {id: 2, name: 'Todo 2', isDone: false},
    {id: 3, name: 'Todo 3', isDone: true},
    {id: 4, name: 'Todo 4', isDone: true},
    {id: 5, name: 'Todo 5', isDone: false},
  ]
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {...state, showType: action.showType}
    case TODO_DONE:
      return {
        ...state,
        items: state.items.map((todo) => {
          if(action.id == todo.id) {
            return {...todo, isDone: !todo.isDone}
          }
          return todo;
        })
      }
    case TODO_DELETE:
      return {
        ...state,
        items: state.items.filter(todo => action.id !== todo.id)
      }
    case SWITCH_TYPE:
      return {
        ...state,
        showType: action.showType,
      };
    case ADD_TODO:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: `new_${state.items.length+1}`,
            name: action.name,
            isDone: false
          }
        ]
      };
    default:
      return state
  }
}