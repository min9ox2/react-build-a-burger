import Aux from "../../hoc/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { Component } from "react";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerClicked={this.toggleSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          sideDrawerClosed={this.toggleSideDrawerHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
