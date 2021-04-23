import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Result from "../Components/Result";
import Breadcrumb from "../Components/Breadcrumb";

const Item = ({apiData}) => {

  const [items, setItems] = useState([]);

  //Obtengo los items desde el store de la app
  const dataRec = apiData;

  useEffect(() => {
    // Cada vez que la url o el searchbar cambia el query string que genera una nueva busqueda, se vuelve a setear los items
    setItems(dataRec.items);
  }, [dataRec]);

  return (
    <>
    {items !== undefined && (
      <>
       {items.length < 1 && (
        <div className="container item-list mb-5 mt-5 text-center">
          <p>No se encontraron resultados </p>
        </div>
      )} 
      {items.length > 0 && (
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
    )}
      
    </>
  );
};



const mapStateToProp = state => {
  return {
    apiData : state.apiData,
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

