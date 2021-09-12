import React, { Component } from "react";
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

class BurgerBuilder extends Component {
  state = {
    showSummary: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.props.onInitIngredients()
  }

  // componentDidMount() {
  //   axios
  //     .get("/ingredients.json")
  //     .then((response) => {
  //       this.setState({ ingredient: response.data });
  //     })
  //     .catch((error) => this.setState({ error: true }));
  // }

  toggleShowSummary = () => {
    console.log("toggled", this.state.showSummary);
    if (this.props.isAuthenticated) {
      this.setState({
        showSummary: !this.state.showSummary,
      });
    } else {      
      this.props.history.push("/auth");
    }
  };

  orderConfirmedHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  // Will be passed as callback to setState otherwise won't get latest state
  isOrderable = () => {
    let totalAmt = Object.keys(this.props.ingredient).reduce((sum, ig) => {
      return sum + this.props.ingredient[ig];
    }, 0);
    return totalAmt > 0;
  };

  render() {
    let disabledItems = null;
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Cannot reach to backend.</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredient) {
      disabledItems = Object.keys(this.props.ingredient).reduce(
        (items, key) => {
          items[key] = this.props.ingredient[key] <= 0;
          return items;
        },
        {}
      );

      burger = (
        <>
          <Burger ingredient={this.props.ingredient} />
          <BuildControls
            added={this.props.onAddIngredient}
            removed={this.props.onRemoveIngredient}
            disabledItems={disabledItems}
            currentPrice={this.props.totalPrice}
            orderable={this.isOrderable()}
            isAuthenticated={this.props.isAuthenticated}
            ordered={this.toggleShowSummary}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          cancelled={this.toggleShowSummary}
          confirmed={this.orderConfirmedHandler}
          ingredient={this.props.ingredient}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.showSummary} clicked={this.toggleShowSummary}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitIngredients: () => dispatch(actionCreators.initIngredients(INGREDIENT_PRICES)),
    onAddIngredient: (type) =>
      dispatch(actionCreators.addIngredient(type, INGREDIENT_PRICES[type])),
    onRemoveIngredient: (type) =>
      dispatch(actionCreators.removeIngredient(type, INGREDIENT_PRICES[type])),
    onPurchaseInit: () => dispatch(actionCreators.purchaseBurgerInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
