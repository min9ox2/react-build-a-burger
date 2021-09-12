import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import { Component } from "react";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {
  componentDidMount() {
    this.props.onPageReload();
  }

  render() {
    const secureRoutes = [
      <Route path="/checkout" component={asyncCheckout} />,
      <Route path="/orders" component={asyncOrders} />,
    ];

    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            {this.props.isAuthenticated
              ? secureRoutes.map((route) => route)
              : null}
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageReload: () => dispatch(actionCreators.loginStatusCheck()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
