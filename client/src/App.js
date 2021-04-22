import React from 'react';
import {Provider} from "react-redux"
import store from "./store"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.scss'


//Components
import SearchBar from './Components/SearchBar'
import Item from './Views/Item'
import ItemsList from './Views/ItemsList'

function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
      <SearchBar />
        <Switch>
          <Route path='/' component={ItemsList} exact />
          <Route path='/items/:item' component={Item} />  
          <Route path='/items' component={ItemsList} />  
        </Switch>
      </Router>
      </Provider>
    </>
  );
}

export default App;
