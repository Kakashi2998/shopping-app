export const CARTACTIONS = {
    ADDTOCART: 'ADDTOCART',
    REMOVEFROMCART: 'REMOVEFROMCART',
    DELETEFROMCART: 'DELETEFROMCART',
    CLEARCART: 'CLEARCART'
}

{/** Add items to cart (works for old and new products) */}
export const addToCart = (product) => {
    return {
        type: CARTACTIONS.ADDTOCART,
        payload: {
            product: product,
            price: product.price
        }
    }
}

{/** decrease quantity of product */}
export const removeFromCart = (product) => {
    return {
        type: CARTACTIONS.REMOVEFROMCART,
        payload: {
            product: product
        }
    }
}

{/** Delete product entirely from cart */}
export const deleteFromCart = (product) => {
    return {
        type: CARTACTIONS.DELETEFROMCART,
        payload: {
            product: product
        }
    }
}

{/** Clear cart */}
export const clearCart = () => {
    return {
        type: CARTACTIONS.CLEARCART
    }
}