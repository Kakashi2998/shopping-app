export const CARTACTIONS = {
    ADDTOCART: 'ADDTOCART',
    REMOVEFROMCART: 'REMOVEFROMCART',
    DELETEFROMCART: 'DELETEFROMCART',
    CLEARCART: 'CLEARCART'
}

export const addToCart = (product) => {
    return {
        type: CARTACTIONS.ADDTOCART,
        payload: {
            product: product,
            price: product.price
        }
    }
}

export const removeFromCart = (product) => {
    return {
        type: CARTACTIONS.REMOVEFROMCART,
        payload: {
            product: product
        }
    }
}

export const deleteFromCart = (product) => {
    return {
        type: CARTACTIONS.DELETEFROMCART,
        payload: {
            product: product
        }
    }
}

export const clearCart = () => {
    return {
        type: CARTACTIONS.CLEARCART
    }
}