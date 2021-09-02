import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Here's your burger</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredient={props.ingredients} />
            </div>            
            <Button type="Danger" clicked={props.clickedCancel}>Cancel</Button>
            <Button type="Success" clicked={props.clickedContinue}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary
