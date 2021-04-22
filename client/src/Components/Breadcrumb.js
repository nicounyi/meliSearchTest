import React from "react";
import { connect } from "react-redux";


const Breadcrumb = ({categories}) => {
  console.log(categories);
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
    categories : state.categories
  }
}

export default connect(mapStateToProp, {})(Breadcrumb);

