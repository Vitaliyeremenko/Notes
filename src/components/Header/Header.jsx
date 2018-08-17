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
        const { HeaderSelectArrow, HeaderSelectArrowReverse, Header } = classes;
        const { showList } = this.state;
        const { header, name } = this.props;

        return (
            <header className={Header}>
                <div>
                    <span>{header}</span>
                    {name && (
                    <div>
                        <p onClick={this.toogleList}>{name}
                            <img className={`${HeaderSelectArrow} ${showList && HeaderSelectArrowReverse}`} src={arrow} alt="arrow" />
                        </p>
                        {showList && <ul><li><NavLink to="/logout" exact>Logout</NavLink></li></ul>}
                    </div>)}
                </div>
            </header>
        )
    }
   
}

export default Header;