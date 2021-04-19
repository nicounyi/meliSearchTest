import React from 'react';
import { useLocation } from 'react-router-dom'
import SearchBar from '../Components/SearchBar'

const Item = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const result = query.get("search");


    return ( 
        <>
            <SearchBar/>
            Componente Items Founds :
            {result}
        </>
     );
}
 
export default Item;