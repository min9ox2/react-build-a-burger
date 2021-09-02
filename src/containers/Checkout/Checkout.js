import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  clickedCancelHandler = () => {
    this.props.history.goBack();
  };

  clickedContinueHandler = () => {
    this.props.history.replace("/checkout/contactData");
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // [salad, 1]
      console.log("params=======", param);
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log(ingredients);
    this.setState({ ingredients: ingredients, price: price });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          clickedCancel={this.clickedCancelHandler}
          clickedContinue={this.clickedContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contactData"}
          render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} />}
        />
      </div>
    );
  }
}

export default Checkout;
