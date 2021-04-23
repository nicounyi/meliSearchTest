import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Breadcrumb = ({ savedCategories }) => {
  const [categories, setCategories] = useState([]);
  const apiCategories = savedCategories;
  const { item } = useParams();
  const localItemId = JSON.parse(localStorage.getItem("itemId"));
  const localCategories = JSON.parse(localStorage.getItem("categorias"));

  // Pequeño fix, al no tener las categorias en la api de Item, si el id de la url es igual al id que se guardo en el storage se setea esas categorias
  if (categories.length === 0 && item === localItemId) {
    setCategories(localCategories);
  }

  useEffect(() => {
    setCategories(apiCategories);
  }, [apiCategories]);

  return (
    <>
      <div className="container breadcrumbCategories">
        <div className="row">
          <ol className="breadcrumb breadcrumb-meli">
            {categories !== undefined && (
              <>
                {categories.map((item) => (
                  <li className="breadcrumb-item" key={item}>
                    {item}
                  </li>
                ))}
              </>
            )}
          </ol>
        </div>
      </div>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    savedCategories: state.categories,
  };
};

export default connect(mapStateToProp, {})(Breadcrumb);
