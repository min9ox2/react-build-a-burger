import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {

  clickedCancelHandler = () => {
    this.props.history.goBack();
  };

  clickedContinueHandler = () => {
    this.props.history.replace("/checkout/contactData");
  };

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredient && ! this.props.purchased) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredient}
            clickedCancel={this.clickedCancelHandler}
            clickedContinue={this.clickedContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contactData"}
            component={ContactData}
          />
        </div>
      )
    }
    
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
