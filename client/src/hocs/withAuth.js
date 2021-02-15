import React from 'react';
import { connect } from 'react-redux';

export default function (ComponentToBeRendered) {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.user.isAuthenticated,
        };
    };

    return connect(mapStateToProps)(Authenticate);
}
