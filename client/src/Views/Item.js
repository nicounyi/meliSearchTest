import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../Components/Breadcrumb";

const ItemFounds = () => {
  const [objeto, setItems] = useState([]);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const { item } = useParams();

  useEffect(() => {
    async function searchItems() {
      await axios
        .get(`http://localhost:8010/api/items/` + item)
        .then((res) => {
          if (res.status === 200) {
            setItems(res.data.item);
            if(res.data.item.condition === "new") {
              setCondition("Nuevo");
            } 
            if(res.data.item.condition === "used") {
              setCondition("Usado");
            } 
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
      <Breadcrumb />
      <div className="container item-details">
        <div className="row">
          <div className="col-12 col-lg-7">
          <img src={objeto.picture} className="img-fluid" alt={objeto.title} />
          </div>
          <div className="col-12 col-lg-5">
          {condition} - {objeto.sold_quantity} Vendidos
          <h2>{objeto.title}</h2>
          <p>$ {price}</p>
          </div>
        </div>
        <div className="row">
          <div className="con-12 mt-5">
            <h2>Descripción del producto</h2>
            <p>{objeto.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemFounds;
