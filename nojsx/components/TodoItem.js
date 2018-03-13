const {createElement: Element} = React;
const {bindActionCreators} = Redux;
const {connect} = ReactRedux;
import {todoDone, todoDelete} from '../actions/todos.js';

const TodoItem = ({id, name, isDone, todoDone, todoDelete}) => {
  return Element(
    'div',
    {className: ['todo__item', (isDone ? 'todo__item_done' : '')].filter(e => e).join(' ')},
    Element(
      'div',
      {className: ['todo__checkbox'], onClick: () => {todoDone(id)}}
    ),
    Element(
      'div',
      {className: 'todo__name'},
      name
    ),
    Element(
      'div',
      {className: 'todo__delete', onClick: () => {todoDelete(id)}},
      'x'
    )
  )
}

function mapStateToProps(state, props) {
  return {...props}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({todoDone, todoDelete}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);