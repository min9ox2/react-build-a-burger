import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.sideDrawerClicked} />
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </header>
    )
}

export default toolbar
