import React, {Component} from 'react';
import { connect } from 'react-redux';


import classes from './Layout.css';
import Header from '../../components/Header/Header';
import Aux from '../Auxiliary/Auxiliary';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <Header header={this.props.header} name={this.props.username}/>
                <main className={classes.Main}>
                    {this.props.children}
                </main>
            </Aux>
            
        )
    }

}

const mapStateToProps = state => {
    return{
        header: state.auth.header,
        username: state.auth.name
    }
}

export default connect(mapStateToProps)(Layout);