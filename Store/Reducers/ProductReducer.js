const { dummyProducts } = require("../../Data/dummyProducts");

const initState = {
    products: dummyProducts,
}

const ProductReducer = (state = initState, action) => {
    switch (action.type){
        default: return state;
    }
}

export default ProductReducer;