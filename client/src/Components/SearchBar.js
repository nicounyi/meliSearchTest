import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import mainLogo from "../img/Logo_ML.png";
import searchImg from "../img/ic_Search.png";

const SearchBar = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const result = urlParams.get("search") || "";
  const [input, setInput] = useState("" || result);

  const isEmpty = (str) => !str.trim().length;
  const history = useHistory();

  const submitAction = (e) => {
    e.preventDefault();
    if (isEmpty(input)) {
      history.push({ pathname: "/" });
    } else {
      history.push({ pathname: "/items", search: "?search=" + input });
      
    }
  };

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
                        <img
                          src={searchImg}
                          className="search-bar__button--img"
                          alt="Imagen de busqueda"
                        />
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

export default SearchBar;
