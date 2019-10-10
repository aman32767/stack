import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux'
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      pin: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your pin code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched:false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'cheapest', displayValue: 'Cheapest' },
            { value: 'fastest', displayValue: 'Fastest' }
          ]
        },
        value:'cheapest',
        validation:{},
        valid:true
      }
    },
    formIsValid:false,
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
    console.log(this.props.ingredients);
  };
  checkValidation(value, rules) {
    let isValid = true;
    if (rules.required ) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }
  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid=true;
    for(let inputIdentifier in updatedOrderForm)
    {
      formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    updatedFormElement.touched=true;
    this.setState({ orderForm: updatedOrderForm , formIsValid:formIsValid });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(e => {
          return (
            <Input
              key={e.id}
              elementType={e.config.elementType}
              elementConfig={e.config.elementConfig}
              value={e.config.value}
              invalid={!e.config.valid}
              shouldValidate={e.config.validation}
              touched={e.config.touched}
              changed={event => this.inputChangeHandler(event, e.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price:state.totalPrice
  }
}
export default connect(mapStateToProps)(ContactData);
