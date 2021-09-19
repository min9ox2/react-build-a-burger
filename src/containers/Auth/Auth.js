import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const inputChangedHandler = (event, inputKey) => {
    console.log(event.target.value);

    let updatedControls = { ...controls };
    let updatedFormElement = {
      ...updatedControls[inputKey],
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        updatedControls[inputKey].validation
      ),
      touched: true,
    };
    updatedControls[inputKey] = updatedFormElement;
    let validForm = true;
    for (let key in updatedControls) {
      validForm = updatedControls[key].valid && validForm;
    }
    console.log("validform", validForm);
    setControls(updatedControls);
  };

  const authHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthHandler = (event) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  };

  let inputs = Object.keys(controls).map((key) => {
    let inputItem = controls[key];
    return (
      <Input
        key={key}
        elementType={inputItem.elementType}
        elementConfig={inputItem.elementConfig}
        value={inputItem.value}
        invalid={!inputItem.valid}
        touched={inputItem.touched}
        changed={(event) => inputChangedHandler(event, key)}
      />
    );
  });

  let submitButton = <Button type="Success">Submit</Button>;
  if (props.loading) {
    submitButton = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <p style={{ color: "red" }}>
        {props.error.message.replace("_", " ")}
      </p>
    );
  }

  let redirect = null;
  if (props.isAuthenticated) {
    if (props.burgerCustomized) {
      redirect = <Redirect to="/checkout" />;
    } else {
      redirect = <Redirect to="/" />;
    }
  }

  return (
    <div className={styles.Auth}>
      {redirect}
      <h3>{isSignUp ? "SIGN UP" : "SIGN IN"}</h3>
      <a
        style={{ color: "#8F5C2C", textDecoration: "none" }}
        href="/"
        onClick={(e) => switchAuthHandler(e)}
      >
        Trying to {isSignUp ? "sign in" : "sign up"}?
      </a>
      <form onSubmit={authHandler}>
        {inputs}
        {errorMessage}
        {submitButton}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerCustomized: state.burgerBuilder.customized,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, isSignUp) =>
      dispatch(actionCreators.auth(username, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
