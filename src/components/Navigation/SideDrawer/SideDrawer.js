import React from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let sideDrawerStyles = [styles.SideDrawer, styles.Close];

    if (props.show) {
        sideDrawerStyles[1] = styles.Open;
    }

    return (
        <>
            <Backdrop show={props.show} clicked={props.sideDrawerClosed} />
            <div className={sideDrawerStyles.join(' ')} onClick={props.sideDrawerClosed}>
                <div className={styles.Logo}>
                    <Logo />
                </div>            
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </>
    )
}

export default sideDrawer
