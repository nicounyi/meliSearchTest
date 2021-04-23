import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import mainLogo from "../img/Logo_ML.png";
import searchImg from "../img/ic_Search.png";

const SearchBar = ({saveKey, saveApiData, saveCategories}) => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const re = query.get("search") || "";

  const [input, setInput] = useState("" || re);
  const [isLoading, setisLoading] = useState(false);

  const isEmpty = (str) => !str.trim().length;
  const history = useHistory();


  const submitAction = (e) => {
    e.preventDefault();
    if (isEmpty(input)) {
      history.push({ pathname: "/" });
    } else { 
      // Fix para que no repitan la busqueda y que la api no se ejecute muchas veces
      history.push({ pathname: "/items", search: "?search=" + input });
      saveKey(input);
    }
  };

  useEffect(() => {
    //Fix that
    saveApiData([]);
    if(re !== "" && re !== null) {
      async function searchItems() {
        setisLoading(true);
        await axios
          .get(`http://localhost:8010/api/items?q=:` + re)
          .then((res) => {
            console.log(res);
            saveApiData(res.data);
            saveCategories(res.data.categories);
            localStorage.setItem("categorias", JSON.stringify(res.data.categories));
          })
          .catch((err) => {
            console.error(err);
          });
          setisLoading(false);
      }
      searchItems();
    }
  }, [re]);

  const goToHome = () => {
    history.push({ pathname: "/" });
    setInput("");
    saveApiData([]);
  }

  return (
    <>
      <header className="container-fluid search-bar">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-12 p-md-0">
                <form onSubmit={submitAction}>
                  <div className="input-group">
                    <img
                      src={mainLogo}
                      className="search-bar__mainLogo"
                      alt="Mercado libre"
                      onClick={() => goToHome()}
                    />
                    <input
                      type="text"
                      className="form-control search-bar__input"
                      placeholder="Nunca dejes de buscar"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="search-bar__button" type="submit">
                        {isLoading && (
                        <div className="loadingio-spinner-rolling-l2425b256vp"><div className="ldio-39zx2rku61l">
                        <div></div>
                        </div></div>
                        )}
                        {!isLoading && (
                          <img
                          src={searchImg}
                          className="search-bar__button--img"
                          alt="Imagen de busqueda"
                        />
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProp = state => {
  return {
    searchKey : state.searchKey,
    apiData: state.apiData
  }
}

const mapDispatchToProp = dispatch => ({
  saveKey(value) {
    dispatch({
      type: "SAVE_KEY",
      value
    })
  },
  saveApiData(data) {
    dispatch({
      type: "SAVE_APIDATA",
      data
    })
  },
  saveCategories(categories) {
    dispatch({
      type: "SAVE_CATEGORIES",
      categories
    })
  }
});

export default connect(mapStateToProp, mapDispatchToProp)(SearchBar);
