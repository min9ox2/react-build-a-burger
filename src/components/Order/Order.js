import React from "react";
import styles from "./Order.module.css";

const order = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .filter((name) => props.ingredients[name] > 0)
    .map((name) => {
      return (
        <span
          key={name}
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          {name} ({props.ingredients[name]})
        </span>
      );
    });

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>{props.price} MMK</strong>
      </p>
    </div>
  );
};

export default order;
