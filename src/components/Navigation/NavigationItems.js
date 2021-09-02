import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItems/NavigationItem/NavigationItem'

const navigationItems = () => {
    return (
        <div className={styles.NavigationItems}>
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </div>
    )
}

export default navigationItems
