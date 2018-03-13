export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TODO_DONE = 'TODO_DONE';
export const TODO_DELETE = 'TODO_DELETE';
export const SWITCH_TYPE = 'SWITCH_TYPE';
export const ADD_TODO = 'ADD_TODO';

export const todoDone = (id) => ({
  type: TODO_DONE,
  id
})

export const todoDelete = (id) => ({
  type: TODO_DELETE,
  id
})

export const switchType = (showType) => ({
  type: SWITCH_TYPE,
  showType
})

export const addTodo = (name) => ({
  type: ADD_TODO,
  name
})