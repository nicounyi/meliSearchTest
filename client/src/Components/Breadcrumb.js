import React from 'react';

const Breadcrumb = () => {
    return ( 
        <>
        <div className="container breadcrumbCategories">
        <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item">Home</li>
    <li className="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
</nav>
        </div>
        </>
     );
}
 
export default Breadcrumb;