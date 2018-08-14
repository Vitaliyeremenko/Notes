import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

class Auth extends Component {

    state = {
        signin : true,
        controls : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email adress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            confirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    similarTo: 'password'
                },
                valid: false,
                touched: false
            }
            
        } 
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.similarTo) {
            isValid = value === this.state.controls[rules.similarTo].value  && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event,controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        }
        this.setState({controls: updateControls});
    }

    signInHandler = (e) => {
        e.preventDefault();
        this.props.onSignIn(
            this.state.controls.email.value,
            this.state.controls.password.value.toString(),
        )
    }

    signUpHandler = (e) => {
        e.preventDefault();
        this.props.onSignUp(
            this.state.controls.name.value,
            this.state.controls.email.value,
            this.state.controls.password.value.toString(),
            this.state.controls.confirm.value.toString(),
        )
    }

    signInSwitch = (e) => {
        e.preventDefault();
        this.setState({...this.state, signin: !this.state.signin});
        this.props.setHeader(!this.state.signin ? 'sign in' : 'sign up' );
    }

    render() {
        let formElementsArray = [];
        if(this.state.signin){
            formElementsArray = [
                {
                    id: 'email',
                    config: this.state.controls.email
                },
                {
                    id: 'password',
                    config: this.state.controls.password
                }
            ];     
        }else{
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
        }

        const  formInputs = formElementsArray.map(formElement => (
            
            <div className={classes.SignIn} key={formElement.id}>
                <Input
                
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                classes={['SignIn']}
                    />
                    
                {
                    this.props.error!=null && formElement.config.elementConfig.type === 'email'? <p className={classes.Error}>{this.props.error.response.data.errors[0]}</p> : null}
            </div>
               
        ))

        return (
            <form className={classes.Form}>
                { this.props.token ? <Redirect to="/" /> : null}
                {this.props.loading ? <Spinner/> : null}
                {formInputs}
                <div className={classes.Buttons}>
                    <Button
                        btnType = { this.state.signin ? 'Active' : null}
                        clicked = { this.state.signin ? this.signInHandler : this.signInSwitch}
                    >Sign In</Button>
                    <Button
                        btnType = { this.state.signin ? null : 'Active'}
                        clicked = { this.state.signin ? this.signInSwitch : this.signUpHandler}
                    >Sigh Up</Button>
                </div>
            </form> 

        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp : (name,email,password,password_confirmation) => dispatch(actions.signUp(name,email,password,password_confirmation)),
        onSignIn : (email, password) => dispatch(actions.signIn(email, password)),
        setHeader : (header) => dispatch(actions.setHeader(header))
    }
}

const mapStateToProps = state => {
    return{
        token  : state.auth.token,
        error  : state.auth.error,
        loading : state.auth.loading
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Auth));