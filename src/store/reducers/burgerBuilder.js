import * as actions from "../actions/actionTypes";

const initialState = {
  ingredient: null,
  totalPrice: 500,
  error: false,
  customized: false
};

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredient: {
      ...state.ingredient,
      [action.ingredient.type]: state.ingredient[action.ingredient.type] + 1,
    },
    totalPrice: state.totalPrice + action.ingredient.price,
    customized: true
  };
};

const removeIngredient = (state, action) => {
  if (state.ingredient[action.ingredient.type] === 0) {
    return state;
  }
  return {
    ...state,
    ingredient: {
      ...state.ingredient,
      [action.ingredient.type]: state.ingredient[action.ingredient.type] - 1,
    },
    totalPrice: state.totalPrice - action.ingredient.price,
    customized: true
  };
};

const setIngredient = (state, action) => {
  return {
    ...state,
    ingredient: { ...action.ingredient },
    totalPrice: initialState.totalPrice + action.ingredientPrice,
    error: false,
    customized: false
  };
};

const fetchIngredientFailed = (state, action) => {
  return {
    ...state,
    error: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actions.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actions.SET_INGREDIENT:
      return setIngredient(state, action);
    // case actions.CLEAR_ORDER:
    //   return { ...initialState };
    case actions.FETCH_INGREDIENT_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
