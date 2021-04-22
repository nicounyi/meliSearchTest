import { createStore } from 'redux'

const initialState = {
    apiData: [],
};

const reducer = (state = initialState, action) => {
    if (action.type === "SAVE_APIDATA") {
        return {
            ...state,
            apiData: action.data
        }
    }
    
    return state
}

export default createStore(reducer) 