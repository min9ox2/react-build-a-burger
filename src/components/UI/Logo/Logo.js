import React from 'react'
import styles from './Logo.module.css'
import burgerLogo from '../../../assets/images/burger-logo.png'

const logo = () => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="Buildaburger" />
        </div>
    )
}

export default logo
