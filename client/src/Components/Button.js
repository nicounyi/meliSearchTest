import React from 'react';

const Button = ({text, styleBtn}) => {

    return ( 
        <>
            <button className={"button-meli button-meli__"+styleBtn}  >
                {text}
            </button>
        </>
     );
}
 
export default Button;