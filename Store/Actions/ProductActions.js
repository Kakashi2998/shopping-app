export const PRODUCTACTIONS = {
    FETCHPRODUCTS: 'FETCHPRODUCTS',
    STOREPRODUCTS: 'STOREPRODUCTS',
    CREATEPRODUCT: 'CREATEPRODUCT'
}

export const fetchProducts = () => {
    const products = [];
    return async dispatch => {
        const productRequest = await fetch('https://shop-app-bcecc.firebaseio.com/products.json',
        {
            method: 'GET'
        });
        const productData = await productRequest.json();
        Object.keys(productData).forEach(key => {
            products.push({
                id: key,
                ...productData[key]
            });
        });
        dispatch(storeProducts(products));
    }
}

export const storeProducts = (products) => {
    return {
        type: PRODUCTACTIONS.STOREPRODUCTS,
        payload: {products}
    }
}

export const createProduct = (name, price, image) => {
    return {
        type: PRODUCTACTIONS.CREATEPRODUCT,
        payload: {
            product: {
                name, price, image
            }
        }
    }
}   