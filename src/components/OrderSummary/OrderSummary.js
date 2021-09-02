import React from "react";

import Button from "../UI/Button/Button";

const OrderSummary = (props) => {
  let ingredients = Object.keys(props.ingredient).map((ig) => {
    return (
      <li key={ig}>
        <span style={{ textTransform: "capitalize" }}>{ig}</span>:{" "}
        {props.ingredient[ig]}
      </li>
    );
  });

  return (
    <div>
      <h3>Order Summary</h3>
      You have selected following ingredients.
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price: {props.totalPrice} Kyats</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancelled} type="Danger">
        CANCEL
      </Button>
      <Button clicked={props.confirmed} type="Success">
        CONFIRM
      </Button>
    </div>
  );
};

export default OrderSummary;
