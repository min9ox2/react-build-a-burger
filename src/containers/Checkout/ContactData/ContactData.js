import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      township: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Township",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    validForm: false,
  };

  checkValidity(input, rule) {
    let isValid = true;
    if (rule.required) {
      isValid = input.trim() !== "" && isValid;
    }
    if (rule.minLength) {
      isValid = input.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = input.length <= rule.maxLength && isValid;
    }
    console.log("isvalid", isValid);
    return isValid;
  }

  inputChangedHandler = (event, inputKey) => {
    console.log(event.target.value);
    
    let updatedOrderForm = { ...this.state.orderForm };
    let updatedFormElement = {
      ...updatedOrderForm[inputKey],
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        updatedOrderForm[inputKey].validation
      ),
      touched: true,
    };
    updatedOrderForm[inputKey] = updatedFormElement;    
    let validForm = true;
    for (let key in updatedOrderForm) {
      validForm = updatedOrderForm[key].valid && validForm;
    }
    console.log("validform", validForm);
    this.setState({ orderForm: updatedOrderForm, validForm });
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    let orderData = {};
    for (let form in this.state.orderForm) {
      orderData[form] = this.state.orderForm[form].value;
    }
    let order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData,
    };
    axios
      .post("/orders.json", order)
      .then((res) => this.setState({ loading: false, showSummary: false }))
      .catch((error) => this.setState({ loading: false, showSummary: false }));
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <h3>Enter your contact info:</h3>
        <form onSubmit={this.orderHandler}>
          {Object.keys(this.state.orderForm).map((key) => {
            let inputItem = this.state.orderForm[key];
            return (
              <Input
                key={key}
                elementType={inputItem.elementType}
                elementConfig={inputItem.elementConfig}
                value={inputItem.value}
                invalid={!inputItem.valid}
                touched={inputItem.touched}
                changed={(event) => this.inputChangedHandler(event, key)}
              />
            );
          })}
          <Button disabled={!this.state.validForm} type="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
