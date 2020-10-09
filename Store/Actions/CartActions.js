export const ADDTOCART = 'ADDTOCART';

export const addToCart = (product) => {
    return {
        type: ADDTOCART,
        payload: {
            product: product,
            price: product.price
        }
    }
} 