import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
class Checkout extends Component {

  // componentWillMount(){
  //   this.props.onInitPurchase();
  // }
  onCheckoutCancelHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/details');
  };
  render() {
    let summary = <Redirect to="/" />;
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    if (this.props.ings) {
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancel={this.onCheckoutCancelHandler}
            onCheckoutContinued={this.onCheckoutContinueHandler}
          />
          <Route
            path={this.props.match.path + '/details'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary ;
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased:state.order.purchased
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitPurchase:()=> dispatch(actions.purchaseInit)
//   }
// }
export default connect(mapStateToProps)(Checkout);
