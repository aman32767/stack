import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
  
    purchasing: false,
    loading: false,
    error:false
  };

  componentDidMount() {
    // axios.get('https://burger-builder-2099.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error=>{
    //     this.setState({error:true})
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  purchaseHandler = props => {
    this.setState({ purchasing: true });
  };

  modelClosedHandler = props => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = props => {
 
    this.props.history.push('/checkout')

  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary=null;
   
   
    let burger = this.state.error?<p style={{color:'red'}}>Oops!! Ingredients Cant Be Loaded.</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchaseState(this.props.ings)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.modelClosedHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.modelClosedHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
      ings:state.ingredients,
      totalPrice:state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded : (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
      onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
