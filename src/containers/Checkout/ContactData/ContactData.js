import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      pin: ''
    },
    loading:false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      coustomer: {
        name: 'Aman',
        address: {
          street: 'Street no 4',
          pin: '110094',
          country: 'India'
        },
        email: 'sharmaman.2099@gmail.com'
      },
      deliveryMethod: 'Fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false });
      });
    console.log(this.props.ingredients);
  };
  render() {
      let form=(
          <form>
              <input
                  className={classes.Input}
                  type="text"
                  name="name"
                  placeholder="your name"
              />
              <input
                  className={classes.Input}
                  type="email"
                  name="email"
                  placeholder="your email"
              />
              <input
                  className={classes.Input}
                  type="text"
                  name="street"
                  placeholder="your street"
              />
              <input
                  className={classes.Input}
                  type="pin"
                  name="name"
                  placeholder="your PIN"
              />
              <Button btnType="Success" clicked={this.orderHandler}>
                  ORDER
          </Button>
          </form>
      );
      if(this.state.loading)
      {
          form=<Spinner />
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
       {form}
      </div>
    );
  }
}

export default ContactData;
