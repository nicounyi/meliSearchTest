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
      // You can await here
      const response = await axios
        .get(`http://localhost:8010/api/items?q=:` + result)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setItems(res.data.items);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    searchItems();
  }, [result, loading]);

  return (
    <>
      <SearchBar/>
      <Breadcrumb categories="" />
      {loading && (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>Cargando</p>
            </div>
          </div>
        </div>
      )}
      {items.slice(0, 4).map((item) => (
        <Result key={item.id} item={item} />
      ))}
    </>
  );
};

export default Item;
