import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,component } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import {connect } from 'react-redux'
class Checkout extends Component {


  onCheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/details');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancel={this.onCheckoutCancelHandler}
          onCheckoutContinued={this.onCheckoutContinueHandler}
        />
        {console.log(this.props.match.path)}
        <Route
          path={this.props.match.path + '/details'}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings:state.ingredients,
   
  }
}
export default connect(mapStateToProps)(Checkout);
