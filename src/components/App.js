'use strict';
import React from 'react';
import AppMap from './AppMap';

const App = () => (
  <div>
    <div className="header alert-dark">
      <h1 className="header__title">leafletjs</h1>
    </div>
    <div className="container main">
      <AppMap />
    </div>
  </div>
);

export default App;