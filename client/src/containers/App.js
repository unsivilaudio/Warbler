import React from 'react';
import jwtDecode from 'jwt-decode';
import localStorage from 'local-storage';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../actions/auth';

class App extends React.Component {
    componentDidMount() {
        let token = localStorage.get('jwtToken');
        if (token) {
            setAuthorizationToken(token);
            try {
                this.props.setCurrentUser(jwtDecode(token));
                console.log('logged in!');
            } catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <Main />
            </>
        );
    }
}

export default connect(null, { setCurrentUser })(App);
