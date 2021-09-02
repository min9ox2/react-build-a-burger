import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price : <strong>{props.currentPrice}</strong> Kyats
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.added(control.type)}
          removed={() => props.removed(control.type)}
          disabled={props.disabledItems[control.type]}
        />
      ))}
      <button 
        className={styles.OrderButton}
        disabled={! props.orderable}
        onClick={props.ordered}>
          ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
