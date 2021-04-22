import React, { useEffect } from "react";
import { connect } from "react-redux";


const Breadcrumb = ({apiData}) => {
 //console.log(apiData);
  return (
    <>
            {/* {categories.map((item) => (
             <p>{item}</p>
            ))} */}
      <div className="container breadcrumbCategories">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active" aria-current="page">
              Library
            </li>
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

