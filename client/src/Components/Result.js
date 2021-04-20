import React from "react";
import { Link } from "react-router-dom";
import freeShipping from "../img/ic_shipping.png";

const Result = ({ item }) => {
  return (
    <>
    <Link to={"/items/" + item.id} className="nolink">
      <div className="row item-list__row">
        <div className="col-12 col-sm-5 col-xl-2 text-center">
          <img
            src={item.picture}
            alt={item.title}
            className="item-list__img img-fluid"
          />
        </div>
        <div className="col-12 col-sm-7 col-xl-10">
          <div className="item-list__price">
            $ {item.price.amount}
            <div className="item-list__price--free-shipping">
              {item.free_shipping && (
                <img src={freeShipping} alt="Envio gratis" />
              )}
            </div>
          </div>
          <div className="item-list__title">{item.title}</div>
          <div className="item-list__adress">{item.adress}</div>
        </div>
      </div>
      </Link>
    </>
  );
};

export default Result;
