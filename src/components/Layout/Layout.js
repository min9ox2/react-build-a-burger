import Aux from "../../hoc/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { useState } from "react";
import { connect } from "react-redux";

const Layout = props => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  };
  
  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        sideDrawerClicked={toggleSideDrawerHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        show={showSideDrawer}
        sideDrawerClosed={toggleSideDrawerHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
