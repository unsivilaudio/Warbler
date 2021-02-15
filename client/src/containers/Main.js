import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authUser } from '../actions/auth';
import { removeError } from '../actions/errors';
import MessageForm from '../containers/MessageForm';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import withAuth from '../hocs/withAuth';

const Main = props => {
    const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className='container'>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={props => (
                        <Homepage currentUser={currentUser} {...props} />
                    )}
                />
                <Route
                    exact
                    path='/signin'
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                buttonText='Log in'
                                heading='Welcome Back.'
                                {...props}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path='/signup'
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                signUp
                                buttonText='Sign Me Up!'
                                heading='Join Warbler Today'
                                {...props}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path='/users/:id/messages/new'
                    component={withAuth(MessageForm)}
                />
            </Switch>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentUser: state.user,
        errors: state.errors,
    };
};

const currentComponent = connect(mapStateToProps, { authUser, removeError })(
    Main
);

export default withRouter(currentComponent);
