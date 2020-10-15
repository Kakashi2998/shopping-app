export const ORDERACTIONS = {
  ADDORDER: "ADDORDER",
};

export const addOrder = (orderItems, price, timeStamp, address) => {
  return {
    type: ORDERACTIONS.ADDORDER,
    payload: {
      order: {
        orderItems: orderItems,
        price: price,
        timeStamp: timeStamp,
        address: address,
      },
    },
  };
};
