import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import SearchBar from "../Components/SearchBar";
import Breadcrumb from "../Components/Breadcrumb";

const ItemFounds = () => {
  const [objeto, setItems] = useState([]);
  const [price, setPrice] = useState("");

  const { item } = useParams();

  useEffect(() => {
    async function searchItems() {
      const response = await axios
        .get(`http://localhost:8010/api/items/` + item)
        .then((res) => {
          if (res.status === 200) {
            setItems(res.data.item);
            //Fix for price
            setPrice(res.data.item.price.amount);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    searchItems();
  }, [item]);
  return (
    <>
      <SearchBar />
      <Breadcrumb />
      <div className="container">
        <div className="row">
          <div className="col-12">
          <h1>Componente Item id : {item}</h1>
          <br/>
          <img src={objeto.picture} />
            <br />
            {objeto.title}
            <br />
            {objeto.condition}
            <br />
            {objeto.description}
            <br />
            {price}
            <br />
            {objeto.sold_quantity}
            <br />
           
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemFounds;
