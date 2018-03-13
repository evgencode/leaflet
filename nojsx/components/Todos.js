const {createElement: Element} = React;
const {connect} = ReactRedux;

import TodoItem from './TodoItem.js';

const Todos = ({todos}) => {
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

function filterTodos(todos, showType) {
  switch (showType) {
    case 'all':
      return todos
    case 'done':
      return todos.filter(t => t.isDone)
    case 'active':
      return todos.filter(t => !t.isDone)
    default:
      throw new Error('Unknown showType: ' + showType)
  }
}

function mapStateToProps(state) {
  return {
    todos: filterTodos(state.todos.items, state.todos.showType)
  }
}

export default connect(mapStateToProps)(Todos);