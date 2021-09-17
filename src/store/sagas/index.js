import { all, takeEvery } from "@redux-saga/core/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  autoLogoutSaga,
  authSaga,
  loginStatusCheckSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_AUTO_LOGOUT, autoLogoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATUS, loginStatusCheckSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENT_REQUEST, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASES_BURGER_REQUEST, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_REQUEST, fetchOrdersSaga);
}
