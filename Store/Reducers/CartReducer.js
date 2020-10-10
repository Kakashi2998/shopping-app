import { ADDTOCART, REMOVEFROMCART } from "../Actions/CartActions";

const initState = {
    cart: [],
    totalPrice: 0
}

const CartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADDTOCART: {
            return addToCart(state, action);
        };
        case REMOVEFROMCART: {
            return removeFromCart(state, action);
        }
        default: return state;
    }
}

const addToCart = (state, action) => {
    const product = action.payload.product;
    const index = state.cart.findIndex(item => item.id === product.id);
    if(index >= 0){
        const qty = state.cart[index].qty + 1;
        return {
            ...state,
            cart: [...state.cart.filter(p => p.id !== product.id), {...product, qty: qty}],
            totalPrice: state.totalPrice + product.price
        }
    }
    return {
        ...state,
        cart: [{...product, qty: 1}, ...state.cart],
        totalPrice: state.totalPrice + product.price
    }
}

const removeFromCart = (state, action) => {
    const product = action.payload.product;
    const index = state.cart.findIndex(item => item.id === product.id);
    if(index >= 0){
        const qty = state.cart[index].qty - 1;
        if(qty === 0){
            return {
                ...state,
                cart: [...state.cart.filter(p => p.id !== product.id)],
                totalPrice: state.totalPrice - product.price
            }
        }
        return {
            ...state,
            cart: [...state.cart.filter(p => p.id !== product.id), {...product, qty: qty}],
            totalPrice: state.totalPrice - product.price
        }
    }
    return state;
    
}

export default CartReducer;