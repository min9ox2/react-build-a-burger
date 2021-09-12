import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true,
  };

  inputChangedHandler = (event, inputKey) => {
    console.log(event.target.value);

    let updatedControls = { ...this.state.controls };
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
    this.setState({ controls: updatedControls, validForm });
  };

  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    let controls = Object.keys(this.state.controls).map((key) => {
      let inputItem = this.state.controls[key];
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
    });

    let submitButton = <Button type="Success">Submit</Button>;
    if (this.props.loading) {
      submitButton = <Spinner/>
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{color: 'red'}}>{this.props.error.message.replace('_', ' ')}</p>
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.burgerCustomized) {
        redirect = <Redirect to="/checkout" />
      } else {
        redirect = <Redirect to="/" />
      }      
    }

    return (
      <div className={styles.Auth}>
        {redirect}
        <h3>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h3>
        <a style={{color: '#8F5C2C', textDecoration: 'none'}} href="/" onClick={e => this.switchAuthHandler(e)}>
          Trying to {this.state.isSignUp ? "sign in" : "sign up"}?
        </a>        
        <form onSubmit={this.authHandler}>
          {controls}
          {errorMessage}
          {submitButton}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerCustomized: state.burgerBuilder.customized
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, isSignUp) =>
      dispatch(actionCreators.auth(username, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
