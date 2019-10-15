import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your e-mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail:true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength:6
        },
        valid: false,
        touched: false
      }
    },
    isSignup:true
  };

  checkValidation(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.isEmail)
    {
        var  pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        isValid= pattern.test(value) &&  isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event,controlName) => {

    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value:event.target.value,
            valid:this.checkValidation(event.target.value,this.state.controls[controlName].validation),
            touched:true
        }
    }
 
    this.setState({controls:updatedControls})
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
  }

  changeModeHandler = () => {
    this.setState(prevState => {
      return {isSignup : ! prevState.isSignup}
    })
  }
    render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementArray.map(e => {
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
    });
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
            {form }
          <Button btnType="Success">{this.state.isSignup ? 'Sign Up' : 'Log In'}</Button>
        </form>   
        <Button 
        clicked={this.changeModeHandler}
        btnType="Danger">WANT TO {this.state.isSignup? 'SIGN IN ?':'SIGN UP ?' }</Button>   
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
      return {
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup))
      }
}

export default connect(null,mapDispatchToProps)(Auth);
