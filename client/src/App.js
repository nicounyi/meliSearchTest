import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.scss'


//Components
import ItemsFounds from './Components/ItemsFounds'
import Home from './Components/Home'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/items' component={ItemsFounds} />  
        </Switch>
      </Router>
    </>
  );
}

export default App;
