import { CARTACTIONS } from "../Actions/CartActions";

const initState = {
  cart: [],
  totalPrice: 0,
};

const CartReducer = (state = initState, action) => {
  switch (action.type) {
    case CARTACTIONS.ADDTOCART: {
      return addToCart(state, action);
    }
    case CARTACTIONS.REMOVEFROMCART: {
      return removeFromCart(state, action);
    }
    case CARTACTIONS.DELETEFROMCART: {
      return deleteFromCart(state, action);
    }
    case CARTACTIONS.CLEARCART: {
      return initState;
    }
    default:
      return state;
  }
};

{
  /** Helper function to add rpoduct to cart */
}
const addToCart = (state, action) => {
  const product = action.payload.product;
  const index = state.cart.findIndex((item) => item.id === product.id);
  if (index >= 0) {
    const qty = state.cart[index].qty + 1;
    return {
      ...state,
      cart: [
        ...state.cart.filter((p) => p.id !== product.id),
        { ...product, qty: qty },
      ],
      totalPrice: state.totalPrice + product.price,
    };
  }
  return {
    ...state,
    cart: [{ ...product, qty: 1 }, ...state.cart],
    totalPrice: state.totalPrice + product.price,
  };
};

{
  /** Helper function to remove product from cart */
}
const removeFromCart = (state, action) => {
  const product = action.payload.product;
  const index = state.cart.findIndex((item) => item.id === product.id);
  if (index >= 0) {
    const qty = state.cart[index].qty - 1;
    if (qty === 0) {
      return {
        ...state,
        cart: [...state.cart.filter((p) => p.id !== product.id)],
        totalPrice: state.totalPrice - product.price,
      };
    }
    return {
      ...state,
      cart: [
        ...state.cart.filter((p) => p.id !== product.id),
        { ...product, qty: qty },
      ],
      totalPrice: state.totalPrice - product.price,
    };
  }
  return state;
};

{
  /** Helper function to delete product from cart */
}
const deleteFromCart = (state, action) => {
  const inputItem = action.payload.product;
  const cartItem = state.cart.find((item) => item.id === inputItem.id);
  return {
    ...state,
    cart: state.cart.filter((item) => item.id !== cartItem.id),
    totalPrice: state.totalPrice - cartItem.price * cartItem.qty,
  };
};

export default CartReducer;
