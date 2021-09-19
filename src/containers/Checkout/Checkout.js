import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = (props) => {
  const clickedCancelHandler = () => {
    props.history.goBack();
  };

  const clickedContinueHandler = () => {
    props.history.replace("/checkout/contactData");
  };

  let summary = <Redirect to="/" />;
  if (props.ingredient && !props.purchased) {
    summary = (
      <div>
        <CheckoutSummary
          ingredients={props.ingredient}
          clickedCancel={clickedCancelHandler}
          clickedContinue={clickedContinueHandler}
        />
        <Route
          path={props.match.path + "/contactData"}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
