import mainLogo from "../img/Logo_ML.png";
import searchImg from "../img/ic_Search.png";

import React, { Fragment, useState } from "react";


const SearchBar = () => {
  return (
    <Fragment>
      <header className="container-fluid search-bar">
        <div className="row">
          <div className="container">
            <div className="input-group">
            <img src={mainLogo} className="search-bar__mainLogo" alt="fireSpot"/>
              <input
                type="text"
                className="form-control search-bar__input"
                placeholder="Nunca dejes de buscar"
              />
              <div className="input-group-append">
                <button
                  className="search-bar__button"
                  type="button"
                >
                  <img src={searchImg} className="search-bar__button--img" alt="fireSpot"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default SearchBar;
