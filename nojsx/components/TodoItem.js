const {createElement: Element} = React;

const TodoItem = ({id, name, isDone}) => {
  return Element(
    'div',
    {className: 'todo__item'},
    Element(
      'div',
      {className: 'todo__done'}
    ),
    Element(
      'div',
      {className: 'todo__name'},
      name
    )
  )
}

export default TodoItem;