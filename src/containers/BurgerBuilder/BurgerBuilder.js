import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 20,
  bacon: 30,
  cheese: 15,
  meat: 50
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 10
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const addingPrice = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + addingPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  removerIngredientHandler = type => {
      const oldCount = this.state.ingredients[type];
      if(oldCount<=0)
      {
          return;

      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCount;
      const oldPrice = this.state.totalPrice;
      const deductionPrice = INGREDIENT_PRICES[type];
      const newPrice = oldPrice - deductionPrice;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };
  render() {
      const disabledInfo = {
          ...this.state.ingredients
      }
      for(let key in disabledInfo){
        disabledInfo[key]= disabledInfo[key]<=0;
      }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
         ingredientAdded={this.addIngredientHandler}
         ingredientRemoved={this.removerIngredientHandler}
         disabled={disabledInfo}/>
      </Aux>
    );
  }
}
export default BurgerBuilder;
