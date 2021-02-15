import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class Navbar extends React.Component {
    renderButtons = currentUser => {
        if (currentUser.isAuthenticated) {
            return (
                <>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                to={`/users/${currentUser.user.id}/messages/new`}>
                                New Message
                            </Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <a
                                onClick={this.props.logout}
                                href='/'
                                className='nav-link'>
                                Log out
                            </a>
                        </li>
                    </ul>
                </>
            );
        }
        return (
            <>
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link to='/signup' className='nav-link'>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to='/signin' className='nav-link'>
                            Log In
                        </Link>
                    </li>
                </ul>
            </>
        );
    };

    render() {
        const { currentUser } = this.props;

        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>
                        Warbler{`<\\>`}
                    </Link>
                    <button
                        className='navbar-toggler'
                        data-toggle='collapse'
                        data-target='#navList'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navList'>
                        {this.renderButtons(currentUser)}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
