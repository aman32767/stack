import React from 'react'
import Aux from '../../hoc/Aux'
import Button from '../UI/Button/Button'
import classes from '../UI/Button/Button.css'
const orderSummary = (props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>)
    })
return (
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger having :</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p className={classes.Success}><strong>Total Price - {props.price} Rs</strong></p>
        <p>Continue to checkout??</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
)
}

export default orderSummary;