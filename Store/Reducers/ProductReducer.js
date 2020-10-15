import { PRODUCTACTIONS } from "../Actions/ProductActions";

const initState = {
  products: [],
  idGen: 0,
};

const ProductReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCTACTIONS.STOREPRODUCTS: {
      return {
        products: action.payload.products,
      };
    }
    case PRODUCTACTIONS.CREATEPRODUCT: {
      const product = {
        id: state.idGen + "",
        ...action.payload.product,
      };
      return {
        products: [product, ...state.products],
        idGen: state.idGen + 1,
      };
    }
    default:
      return state;
  }
};

export default ProductReducer;
