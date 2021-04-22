import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";



import { useLocation } from "react-router-dom";
import Result from "../Components/Result";
import Breadcrumb from "../Components/Breadcrumb";

const Item = ({saveCategories}) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const result = query.get("search");

  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function searchItems() {
      setisLoading(true);
      await axios
        .get(`http://localhost:8010/api/items?q=:` + result)
        .then((res) => {
          setItems(res.data.items);
          saveCategories(res.data.categories);
        })
        .catch((err) => {
          console.error(err);
        });
        setisLoading(false);
    }
    searchItems();
  }, [result]);


  return (
    <>
      {isLoading && (
        <div className="container item-list mb-5 mt-5 text-center">
          <p>Buscando...</p>
        </div>
      )}
      {items.length < 1 && result !== null && !isLoading && (
        <div className="container item-list mb-5 mt-5 text-center">
          <p>No se encontraron resultados para {result}</p>
        </div>
      )}
      {items.length > 0 && !isLoading && (
        <div>
          <Breadcrumb />
          <div className="container item-list mb-5">
            {items.slice(0, 4).map((item) => (
              <Result key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};



const mapStateToProp = state => {
  return {
    searchKey : state.categories
  }
}

const mapDispatchToProp = dispatch => ({
  saveCategories(value) {
    dispatch({
      type: "SAVE_CATEGORIES",
      value
    })
  }
});

export default connect(mapStateToProp, mapDispatchToProp)(Item);

