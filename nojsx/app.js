// Begin / v0.0.1

const log = console.log;
const {createElement: Element} = React;
const {render} = ReactDOM;

import Todos from './components/Todos.js';
import {todos} from './mock.js';

const App = () => {
  return Element(
    'div',
    {className: 'appwrap'},
    Element(
      Todos,
      {todos}
    )
  )
}

render(
  Element(App),
  document.querySelector('#app')
)