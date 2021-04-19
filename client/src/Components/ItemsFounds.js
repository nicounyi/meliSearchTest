import React from 'react';
import { useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'

const ItemFounds = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const result = query.get("search").toString();


    return ( 
        <>
            <SearchBar/>
            {result}
        </>
     );
}
 
export default ItemFounds;