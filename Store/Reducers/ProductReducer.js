import { TOGGLESEARCH } from "../Actions/ProductActions";

const { dummyProducts } = require("../../Data/dummyProducts");

const initState = {
    products: dummyProducts,
    search: false
}

const ProductReducer = (state = initState, action) => {
    switch (action.type){
        case TOGGLESEARCH: {
            return {
                ...state,
                search: !state.search
            }
        }
        default: return state;
    }
}

export default ProductReducer;