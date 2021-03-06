import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../Components/Breadcrumb";
import Button from "../Components/Button"

const ItemFounds = () => {

  const [objeto, setItems] = useState([]);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [isLoading, setisLoading] = useState(false);
  // Obtengo el Id de la url
  const { item } = useParams();

  useEffect(() => {
    async function searchItems() {
      setisLoading(true);
      await axios
        .get(`http://localhost:8010/api/items/` + item)
        .then((res) => {
          if (res.status === 200) {
            // Guardo los items en el state
            setItems(res.data.item);
            localStorage.setItem("itemId", JSON.stringify(item));
            if (res.data.item.condition === "new") {
              setCondition("Nuevo");
            }
            if (res.data.item.condition === "used") {
              setCondition("Usado");
            }
            //Precio en un estado ya que se presentaba un undefined
            setPrice(res.data.item.price.amount);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      setisLoading(false);
    }
    searchItems();
  }, [item]);

  // Precio con "."
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Breadcrumb />
      {isLoading && (
        <div className="container mb-5 mt-5 text-center">
          <div className="loadingio-spinner-rolling-l2425b256vp">
            <div className="ldio-39zx2rku61l">
              <div></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="container item-details">
          <div className="row">
            <div className="col-12 col-lg-8 item-details__imgProductCont text-center">
              <img
                src={objeto.picture}
                className="item-details__imgProduct"
                alt={objeto.title}
              />
            </div>
            <div className="col-12 col-lg-4">
              <div className="item-details__conditionAndSold">
                <span>{condition} - {objeto.sold_quantity} Vendidos</span>
              </div>
              <div className="item-details__title">
                <h2>{objeto.title}</h2>
              </div>
              <div className="item-details__price">
              <span>$ {numberWithCommas(price)}</span>
              </div>
              <div className="item-details__button">
                <Button
                  text="Comprar"
                  styleBtn="primary"
                />
              </div>
            </div>
          </div>
          <div className="row item-details__desc">
            <div className="col-12 mt-5">
              <h2>Descripci??n del producto</h2>
              <p>{objeto.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemFounds;
