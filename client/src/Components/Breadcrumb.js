import React, { useEffect, useState } from "react";
import { connect } from "react-redux";


const Breadcrumb = ({savedCategories}) => {

 const [categories, setCategories] = useState([]);
 const apiCategories = savedCategories;

 useEffect(() => {
  setCategories(apiCategories);
}, [apiCategories]);

  return (
    <>
      <div className="container breadcrumbCategories">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {categories !== undefined && 
            <>
              {categories.map((item) => (
                <li className="breadcrumb-item" key={item}>{item}</li>
               ))}
              </> 
            }
          </ol>
        </nav>
      </div>
    </>
  );
};


const mapStateToProp = state => {
  console.log(state);
  return {
    savedCategories : state.categories,
  }
}

export default connect(mapStateToProp, {})(Breadcrumb);

