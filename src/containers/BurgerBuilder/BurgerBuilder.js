import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  cheese: 200,
  bacon: 1000,
  meat: 1500,
  salad: 100,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 500,
    orderable: false,
    showSummary: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredient: response.data });
      })
      .catch((error) => this.setState({ error: true }));
  }

  toggleShowSummary = () => {
    console.log("toggled", this.state.showSummary);
    this.setState({
      showSummary: !this.state.showSummary,
    });
  };

  orderConfirmedHandler = () => {    
    const queryParams = [];
    for (let i in this.state.ingredient) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });
  };

  // Will be passed as callback to setState otherwise won't get latest state
  updateOrderable = () => {
    let totalAmt = Object.keys(this.state.ingredient).reduce((sum, ig) => {
      return sum + this.state.ingredient[ig];
    }, 0);
    this.setState({
      orderable: totalAmt > 0,
    });
  };

  addIngredientHandler = (type) => {
    this.setState(
      {
        ingredient: {
          ...this.state.ingredient,
          [type]: this.state.ingredient[type] + 1,
        },
        totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
      },
      () => {
        this.updateOrderable();
      }
    );
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredient[type] === 0) {
      return;
    }
    this.setState(
      {
        ingredient: {
          ...this.state.ingredient,
          [type]: this.state.ingredient[type] - 1,
        },
        totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
      },
      () => {
        this.updateOrderable();
      }
    );
  };

  render() {
    let disabledItems = null;
    let orderSummary = null;

    let burger = this.state.error ? <p>Cannot reach to backend.</p> : <Spinner />;
    if (this.state.ingredient) {
      disabledItems = Object.keys(this.state.ingredient).reduce(
        (items, key) => {
          items[key] = this.state.ingredient[key] <= 0;
          return items;
        },
        {}
      );

      burger = (
        <>
          <Burger ingredient={this.state.ingredient} />
          <BuildControls
            added={this.addIngredientHandler}
            removed={this.removeIngredientHandler}
            disabledItems={disabledItems}
            currentPrice={this.state.totalPrice}
            orderable={this.state.orderable}
            ordered={this.toggleShowSummary}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          cancelled={this.toggleShowSummary}
          confirmed={this.orderConfirmedHandler}
          ingredient={this.state.ingredient}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
