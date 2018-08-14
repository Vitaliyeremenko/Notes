import React ,{Component} from 'react';
import classes from './Header.css';
import {NavLink} from 'react-router-dom';

import arrow from '../../assets/images/ArrowUp.svg';

class Header extends Component  {
    state = {
        showList : false,
    }

    toogleList = () => {
        this.setState({showList : !this.state.showList})
    }

    render(){
        let arrowClasses = this.state.showList ? [classes.HeaderSelectArrow,classes.HeaderSelectArrowReverse] : [classes.HeaderSelectArrow];
        return (
            <header className={classes.Header}>
                <div>
                    <span>{this.props.header}</span>
                    {this.props.name ? <div>
                        <p onClick={this.toogleList}>{this.props.name}
                         <img 
                            className={arrowClasses.join(' ')}
                            src={arrow}
                            alt="arrow"
                            />
                            </p>
                        {this.state.showList ?<ul>
                            <li><NavLink to="/logout" exact>Logout</NavLink></li>
                        </ul>: null}
                    </div>: null}
                </div>
            </header>
        )
    }
   
}

export default Header;