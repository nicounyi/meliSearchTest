import React from 'react';
import {  useParams } from 'react-router-dom'
import SearchBar from '../Components/SearchBar'

const ItemFounds = () => {

    const { item } = useParams();

    return ( 
        <>
            <SearchBar/>
            Componente Item id :  

            {item}
        </>
     );
}
 
export default ItemFounds;