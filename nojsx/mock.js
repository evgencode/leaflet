const todos = [
  {id: 1, name: 'Todo 1', isDone: false},
  {id: 2, name: 'Todo 2', isDone: false},
  {id: 3, name: 'Todo 3', isDone: true},
  {id: 4, name: 'Todo 4', isDone: false},
  {id: 5, name: 'Todo 5', isDone: true},
]

export {todos};

export const fetchTodos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, 500);
  })
}