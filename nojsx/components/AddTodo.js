const {createElement: Element} = React;
const {connect} = ReactRedux;
import { addTodo } from '../actions/todos.js'

let AddTodo = ({ dispatch }) => {
  let input
  return (
    Element(
      'div',
      {className: 'add-todo'},
      Element(
        'form',
        {onSubmit: e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            dispatch(addTodo(input.value))
            input.value = ''
          }},
        Element(
          'input',
          {ref: node => {
              input = node
            }}
        ),
        Element(
          'button',
          {type: 'submit'},
          'Новое дело'
        )
      )
    )
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo