// Begin / v0.0.2
const log = console.log;
const {createElement: Element} = React;
const {render} = ReactDOM;
const {createStore} = Redux;
const {Provider} = ReactRedux;

import Todos from './components/Todos.js';
import Tabs from './components/Tabs.js';
import AddTodo from './components/AddTodo.js';
import reducer from './reducers/index.js';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
  return Element(
    Provider,
    {store: store},
    Element(
      'div',
      {className: 'appwrap'},
      Element(
        Tabs
      ),
      Element(
        Todos
      ),
      Element(
        AddTodo
      )
    )
  )
}

render(
  Element(App),
  document.querySelector('#app')
)