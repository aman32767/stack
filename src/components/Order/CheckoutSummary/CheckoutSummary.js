import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
const checkoutSummary = (props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'80%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.onCheckoutCancel}>CANCEL</Button>
            <Button btnType="Success"
            clicked={props.onCheckoutContinued}>BILLING DETAILS</Button>
        </div>

    )
}

export default checkoutSummary