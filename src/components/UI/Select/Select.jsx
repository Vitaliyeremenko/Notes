import React,{Component} from 'react';

import classes from './Select.css';
import arrow from '../../../assets/images/ArrowUp.svg';

class Select extends Component {
    
    constructor(props){
        super(props);

        let inputClasses = [];

        if(props.classes){
            props.classes.forEach(function(item){
                inputClasses.push(classes[item]);
            });
        }

        this.state = {
            current : props.elementConfig.default,
            showList : false,
            classes : inputClasses.join(" ")
        }

        
    }

    showList = () => {
        this.setState({show : !this.state.show})
    }

    changeHandler = (value) => {
        this.setState({show : !this.state.show, current: value});
        this.props.changed(value.value);
    }

    render() {
        let list = (
            this.props.elementConfig.options.map(option => (
                <li key={option.value} value={option.value} onClick={() => {this.changeHandler(option)}}>
                    {option.displayValue}
                </li>
            ))
        )

        let arrowClasses = [classes.FilterSelectArrow];
        if(this.state.show){
            arrowClasses.push(classes.FilterSelectArrowReverse)
        }

        return (
            <div className={this.state.classes}>
                <div onClick={this.showList}>
                    <span>{this.state.current.displayValue}</span> 
                    <img 
                        className={arrowClasses.join(' ')}
                        src={arrow}
                        alt="arrow"
                        />
                </div>
                {this.state.show ? <ul>{list}</ul> : null}
            </div>
        );
    }
} 

export default Select;