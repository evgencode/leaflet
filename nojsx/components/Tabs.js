const {createElement: Element} = React;
import TabItem from './TabItem.js';

const Tabs = () => {
  return Element(
    'div',
    {className: 'tabs'},
    Element(TabItem, {name: 'Все', type: 'all'}),
    Element(TabItem, {name: 'Активные', type: 'active'}),
    Element(TabItem, {name: 'Завершенные', type: 'done'})
  )
}

export default Tabs;