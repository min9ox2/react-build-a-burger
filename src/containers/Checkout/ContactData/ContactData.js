import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../../store/actions";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { checkValidity } from "../../../shared/utility";
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

  inputChangedHandler = (event, inputKey) => {
    console.log(event.target.value);

    let updatedOrderForm = { ...this.state.orderForm };
    let updatedFormElement = {
      ...updatedOrderForm[inputKey],
      value: event.target.value,
      valid: checkValidity(
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

    let orderData = {};
    for (let form in this.state.orderForm) {
      orderData[form] = this.state.orderForm[form].value;
    }

    let order = {
      ingredients: this.props.ingredient,
      price: this.props.price,
      orderData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(this.props.token, order);
  };

  render() {
    let form = (
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
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h3>Enter your contact info:</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (token, order) => dispatch(actionCreators.purchaseBurger(token, order))
    // onClearOrder: () => dispatch({ type: actions.CLEAR_ORDER }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
