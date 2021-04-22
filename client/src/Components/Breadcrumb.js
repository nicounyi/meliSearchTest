import React, { useEffect, useState } from "react";
import { connect } from "react-redux";


const Breadcrumb = ({apiData}) => {
 console.log(apiData.categories);

 const [categories, setCategories] = useState([]);
 const apiCategories = apiData.categories;

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
                <li className="breadcrumb-item">{item}</li>
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
  return {
    apiData : state.apiData,
  }
}

export default connect(mapStateToProp, {})(Breadcrumb);

