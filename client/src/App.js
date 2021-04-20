import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.scss'


//Components
import Item from './Views/Item'
import ItemsList from './Views/ItemsList'
import Home from './Views/Home'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/items/:item' component={Item} />  
          <Route path='/items' component={ItemsList} />  
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
