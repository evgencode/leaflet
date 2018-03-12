const {createElement: Element} = React;

import TodoItem from './TodoItem.js';

const Todos = ({todos, showType}) => {

  return Element(
    'div',
    {className: 'todos'},
    todos.map(item => {
      const {id, name, isDone} = item;
      return Element(
        TodoItem,
        {id, name, isDone, key: id}
      )
    })
  )
}

export default Todos;