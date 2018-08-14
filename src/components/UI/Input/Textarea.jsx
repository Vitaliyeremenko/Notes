import React, {Component} from 'react';

import classes from './Input.css';

class Textarea extends Component {

    constructor(props){
        super(props);
     
           this.textarea = React.createRef();
        this.state = {
            style: {
                height: "0px",
                opacity: "0",
            },
            value: props.value
    
        }
    }

    

    autosizeHandler = (e) => {
        
        var el = e.target;
        console.log(el.scrollHeight);
       
        this.setState({
            style: {
                height: el.scrollHeight + 'px',
                opacity: '1'
            }
        })
    }

    componentDidMount () {
            this.setState({
                style: {
                    height: this.textarea.current.scrollHeight + 'px',
                    opacity: '1'
                }
            })
            console.log(this.textarea.current.scrollHeight);
    }

    componentDidUpdate () {
        if(this.state.style.height !== this.textarea.current.scrollHeight + 'px'){
            this.textarea.current.style.height = '0px';
            this.setState({
                style: {
                    height: this.textarea.current.scrollHeight + 'px',
                    opacity: '1'
                }
            })
        }
}

    render () {
        let inputClasses = [classes.InputElement];
        if(this.props.classes){
            this.props.classes.forEach(function(item){
                inputClasses.push(classes[item]);
            });
        }
        return (
            <textarea
                className={inputClasses.join(' ')}
                {...this.props.elementConfig}
                value={this.props.value}
                onChange={this.props.changed}
                onBlur={this.props.focusout}
                style={this.state.style}
                onKeyDown={this.autosize}
                ref={this.textarea}
                />
        )
    }

}

export default Textarea;