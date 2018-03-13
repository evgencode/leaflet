const {createElement: Element} = React;
const {connect} = ReactRedux;
import {switchType} from '../actions/todos.js';

const TabItem = ({name, type, activeType, switchType}) => {
  return Element(
    'div',
    {
      className: ['tabs__item', (type == activeType ? 'tabs__item_active' : '')].filter(e => e).join(' '),
      onClick: () => switchType(type)
    },
    name
  )
}

function mapStateToProps(state) {
  return {
    activeType: state.todos.showType
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchType: showType => dispatch(switchType(showType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabItem);