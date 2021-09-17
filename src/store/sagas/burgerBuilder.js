import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as actions from "../actions";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get("/ingredients.json");
    let initPrice = Object.keys(response.data)
      .filter((key) => response.data[key] > 0)
      .reduce((price, key) => {
        return price + action.ingredientPrices[key];
      }, 0);
    yield put(actions.setIngredients(response.data, initPrice));
  } catch(error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
