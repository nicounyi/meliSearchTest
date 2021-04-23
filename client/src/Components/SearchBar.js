import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import mainLogo from "../img/Logo_ML.png";
import searchImg from "../img/ic_Search.png";

const SearchBar = ({saveKey, saveApiData, saveCategories}) => {

  // Obtengo el query String para la busqueda
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const re = query.get("search") || "";

  // Si no hay query string, se presenta un bug entonces se inicia vacio o con el valor del input
  const [input, setInput] = useState("" || re);
  const [isLoading, setisLoading] = useState(false);

  // Funcion para chequear si el input esta vacio
  const isEmpty = (str) => !str.trim().length;
  // Uso el hook useHistory para pushear el query sting
  const history = useHistory();

  const submitAction = (e) => {
    e.preventDefault();
    if (!isEmpty(input)) { 
      // Fix para que no repitan la busqueda y que la api no se ejecute muchas veces
      history.push({ pathname: "/items", search: "?search=" + input });
      saveKey(input);
    }
  };

  useEffect(() => {
    // Cada vez que se cambie el query string que manda el input, se ejecuta la api de busqueda
    saveApiData([]);
    if(re !== "" && re !== null) {
      async function searchItems() {
        setisLoading(true);
        await axios
          .get(`http://localhost:8010/api/items?q=:` + re)
          .then((res) => {
            // Guardo en el store la data y las catagorias
            saveApiData(res.data);
            saveCategories(res.data.categories);
            // Guardo las categorias en el localstorage por si refresca la pagina en la vista del item
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

  // Funcion que vuelve al home y setea las cosas en blanco
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

// Dispatch para guardar en el store
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
