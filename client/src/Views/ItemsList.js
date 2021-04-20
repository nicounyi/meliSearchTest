import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import Result from "../Components/Result";
import Breadcrumb from "../Components/Breadcrumb";

const Item = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const result = query.get("search");

  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [categories, setCategories] = useState("");

  useEffect(() => {
    async function searchItems() {
      await axios
        .get(`http://localhost:8010/api/items?q=:` + result)
        .then((res) => {
          setItems(res.data.items);
          setisLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    searchItems();
  }, [result]);

  return (
    <>
      <SearchBar changeStateLoading={(isLoading) => setisLoading(isLoading)} />
      {isLoading && (
        <div className="container item-list mb-5 mt-5 text-center">
          <p>Cargando...</p>
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

export default Item;
