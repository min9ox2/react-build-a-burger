import React, { useEffect } from "react";
import { Redirect } from "react-router";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

const Logout = (props) => {

  useEffect(() => {
    props.onLogout();
    // eslint-disable-next-line
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
