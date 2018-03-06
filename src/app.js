'use strict';
import React from 'react';
import {render} from 'react-dom';

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import App from './components/App';


function startApp() {
  render(
    <App/>,
    document.querySelector('#app')
  );
}

document.onreadystatechange = () => {
  if(document.readyState == 'interactive') {
    startApp();
  }
}

