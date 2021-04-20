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
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchItems() {
      const response = await axios
        .get(`http://localhost:8010/api/items?q=:` + result)
        .then((res) => {
          setItems(res.data.items);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    searchItems();
  }, [result]);

  return (
    <>
      <SearchBar />
      {items.length > 0 && (
        <div>
          <Breadcrumb />
          <div className="container item-list mb-5">
            {loading && (
              <div className="row">
                <div className="col-12 text-center">
                  <p>Cargando</p>
                </div>
              </div>
            )}
            {items.slice(0, 4).map((item) => (
              <Result key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      {items.length === 0 && (
        <div className="container item-list mb-5 mt-5 text-center">
          No se encontraron resultados
        </div>
      )}
    </>
  );
};

export default Item;
