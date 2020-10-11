import { ORDERACTIONS } from "../Actions/OrderActions";

const initState = {
    orders: []
}

const OrdersReducer = (state = initState, action) => {
    switch (action.type){
        case ORDERACTIONS.ADDORDER: {
            return {
                orders: [action.payload.order, ...state.orders]
            }
        }
        default: return state
    }
}

export default OrdersReducer;