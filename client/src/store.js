import { createStore } from 'redux'

const initialState = {
    searchKey : "",
    categories : []
};

const reducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === "SAVE_CATEGORIES") {
        return {
            categories: action.value
        }
    }
    if (action.type === "SAVE_KEY") {
        return {
            searchKey: action.value
        }
    }
    
    return state
}

export default createStore(reducer) 