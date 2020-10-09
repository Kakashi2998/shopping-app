import { ADDTOCART } from "../Actions/CartActions";

const initState = {
    cart: [],
    totalPrice: 0
}

const CartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADDTOCART: {
            return {
                ...state,
                cart: [action.payload.product, ...state.cart],
                totalPrice: state.totalPrice + action.payload.price
            }
        }
        default: return state;
    }
}

export default CartReducer;