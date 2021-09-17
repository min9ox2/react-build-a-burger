import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASES_BURGER_SUCCESS,
    orderData,
    orderId: id,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASES_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASES_BURGER_START,
  };
};

export const purchaseBurger = (token, order) => {
  return {
    type: actionTypes.PURCHASES_BURGER_REQUEST,
    token,
    order
  }
  // return (dispatch) => {
  //   dispatch(purchaseBurgerStart());
  //   axios
  //     .post("/orders.json?auth=" + token, order)
  //     .then((res) => {
  //       dispatch(purchaseBurgerSuccess(res.data.name, order));
  //     })
  //     .catch((error) => dispatch(purchaseBurgerFailed(error)));
  // };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASES_BURGER_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
}; 

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_REQUEST,
    token,
    userId
  };
  // return (dispatch) => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  //   axios
  //     .get("/orders.json" + queryParams)
  //     .then((response) => {
  //       const fetchedOrders = [];
  //       for (let key in response.data) {
  //         fetchedOrders.push({
  //           ...response.data[key],
  //           id: key,
  //         });
  //       }
  //       dispatch(fetchOrdersSuccess(fetchedOrders));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchOrdersFailed(error));
  //     });
  // };
};
