import React from 'react';

const Button = ({text, style}) => {

    return ( 
        <>
            <button className={"button-meli button-meli__"+style}  >
                {text}
            </button>
        </>
     );
}
 
export default Button;