import { createStore } from 'redux'

const initialState = {
    searchKey : "",
    apiData: [],
    categories: []
};

const reducer = (state = initialState, action) => {
    if (action.type === "SAVE_APIDATA") {
        return {
            ...state,
            apiData: action.data
        }
    }
    if (action.type === "SAVE_KEY") {
        return {
            ...state,
            searchKey: action.value
        }
    }
    if (action.type === "SAVE_CATEGORIES") {
        return {
            ...state,
            categories: action.categories
        }
    }
    return state
}

export default createStore(reducer) 