import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <div className={styles.NavigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>      
      {props.isAuthenticated ? (
        <>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </>
      ) : (
        <NavigationItem link="/auth">Sign Up</NavigationItem>
      )}
    </div>
  );
};

export default navigationItems;
