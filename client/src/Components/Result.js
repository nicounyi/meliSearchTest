import React from 'react';

const Result = ({item}) => {
    return ( 
        <>
        <div className="container item-list">
            <div className="row">
                <div className="col-12 col-sm-5 col-md-2">
                    {item.id}
                </div>
                <div className="col-12 col-sm-7 col-md-10">
                    {item.title}
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Result;