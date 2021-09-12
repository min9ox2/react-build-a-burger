import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (type, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: { type, price },
  };
};

export const removeIngredient = (type, price) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: { type, price },
  };
};

const setIngredients = (ingredients, initPrice) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredient: ingredients,
    ingredientPrice: initPrice,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};

export const initIngredients = (ingredientPrices) => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        let initPrice = Object.keys(response.data)
          .filter((key) => response.data[key] > 0)
          .reduce((price, key) => {
            return price + ingredientPrices[key];
          }, 0);
        // for (let k in response.data) {
        //   if (response.data[k] > 0) {
        //     initPrice = ingredientPrices[k] + initPrice;
        //   }
        // }
        dispatch(setIngredients(response.data, initPrice));
      })
      .catch((e) => dispatch(fetchIngredientsFailed()));
  };
};
