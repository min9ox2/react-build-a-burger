import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const INGREDIENT_PRICES = {
  cheese: 200,
  bacon: 1000,
  meat: 1500,
  salad: 100,
};

const BurgerBuilder = (props) => {
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
    // eslint-disable-next-line
  }, []);

  const toggleShowSummary = () => {
    console.log("toggled", showSummary);
    if (props.isAuthenticated) {
      setShowSummary(!showSummary);
    } else {
      props.history.push("/auth");
    }
  };

  const orderConfirmedHandler = () => {
    props.onPurchaseInit();
    props.history.push("/checkout");
  };

  // Will be passed as callback to setState otherwise won't get latest state
  const isOrderable = () => {
    let totalAmt = Object.keys(props.ingredient).reduce((sum, ig) => {
      return sum + props.ingredient[ig];
    }, 0);
    return totalAmt > 0;
  };

  let disabledItems = null;
  let orderSummary = null;

  let burger = props.error ? <p>Cannot reach to backend.</p> : <Spinner />;
  if (props.ingredient) {
    disabledItems = Object.keys(props.ingredient).reduce((items, key) => {
      items[key] = props.ingredient[key] <= 0;
      return items;
    }, {});

    burger = (
      <>
        <Burger ingredient={props.ingredient} />
        <BuildControls
          added={props.onAddIngredient}
          removed={props.onRemoveIngredient}
          disabledItems={disabledItems}
          currentPrice={props.totalPrice}
          orderable={isOrderable()}
          isAuthenticated={props.isAuthenticated}
          ordered={toggleShowSummary}
        />
      </>
    );

    orderSummary = (
      <OrderSummary
        cancelled={toggleShowSummary}
        confirmed={orderConfirmedHandler}
        ingredient={props.ingredient}
        totalPrice={props.totalPrice}
      />
    );
  }

  return (
    <Aux>
      <Modal show={showSummary} clicked={toggleShowSummary}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitIngredients: () =>
      dispatch(actionCreators.initIngredients(INGREDIENT_PRICES)),
    onAddIngredient: (type) =>
      dispatch(actionCreators.addIngredient(type, INGREDIENT_PRICES[type])),
    onRemoveIngredient: (type) =>
      dispatch(actionCreators.removeIngredient(type, INGREDIENT_PRICES[type])),
    onPurchaseInit: () => dispatch(actionCreators.purchaseBurgerInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
