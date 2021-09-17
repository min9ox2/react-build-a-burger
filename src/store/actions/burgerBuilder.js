import * as actionTypes from "./actionTypes";

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

export const setIngredients = (ingredients, initPrice) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredient: ingredients,
    ingredientPrice: initPrice,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};

export const initIngredients = (ingredientPrices) => {
  return {
    type: actionTypes.INIT_INGREDIENT_REQUEST,
    ingredientPrices
  }
  // return (dispatch) => {
  //   axios
  //     .get("/ingredients.json")
  //     .then((response) => {
  //       let initPrice = Object.keys(response.data)
  //         .filter((key) => response.data[key] > 0)
  //         .reduce((price, key) => {
  //           return price + ingredientPrices[key];
  //         }, 0);
  //       dispatch(setIngredients(response.data, initPrice));
  //     })
  //     .catch((e) => dispatch(fetchIngredientsFailed()));
  // };
};
