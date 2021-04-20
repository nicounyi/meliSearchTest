import React from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom'
import SearchBar from '../Components/SearchBar'
import Result from '../Components/Result'
import Breadcrumb from '../Components/Breadcrumb'


const Item = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const result = query.get("search");

    axios.get(`http://localhost:8010/api/items?q=:motos`)
    .then(res => {
      const persons = res;
      console.log(persons);
    })


    return ( 
        <>
            <SearchBar/>
            <Breadcrumb
                categories=""
            />
            <Result
                item={result}                  
            />
            Componente Items Founds :
            {result}
        </>
     );
}
 
export default Item;