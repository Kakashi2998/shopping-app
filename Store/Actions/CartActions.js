export const ADDTOCART = 'ADDTOCART';
export const REMOVEFROMCART = 'REMOVEFROMCART';

export const addToCart = (product) => {
    return {
        type: ADDTOCART,
        payload: {
            product: product,
            price: product.price
        }
    }
}

export const removeFromCart = (product) => {
    return {
        type: REMOVEFROMCART,
        payload: {
            product: product
        }
    }
}