import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import React, { useEffect } from "react";

const App = (props) => {
  
  useEffect(() => {
    props.onPageReload();
    // eslint-disable-next-line
  }, []);

  const secureRoutes = [
    <Route path="/checkout" component={Checkout} />,
    <Route path="/orders" component={Orders} />,
  ];

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          {props.isAuthenticated
            ? secureRoutes.map((route) => route)
            : null}
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
};

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
