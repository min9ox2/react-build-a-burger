import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  const order = {
    ...action.orderData,
    id: action.orderId,
  };
  return {
    ...state,
    orders: state.orders.concat(order),
    loading: false,
    purchased: true,
  };
};

const purchaseBurgerFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const purchaseBurgerStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const purchaseBurgerInit = (state, action) => {
  return {
    ...state,
    purchased: false,
  };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders,
  };
};

const fetchOrdersFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASES_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASES_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASES_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASES_BURGER_INIT:
      return purchaseBurgerInit(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    default:
      return state;
  }
};

export default reducer;
