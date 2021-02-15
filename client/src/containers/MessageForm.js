import React from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../actions/messages';

class MessageForm extends React.Component {
    state = { message: '' };

    handleMessage = event => {
        event.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({ message: '' });
        this.props.history.push('/');
    };

    render() {
        return (
            <form onSubmit={this.handleMessage} className='mt-3'>
                {this.props.error && (
                    <div className='alert alert-danger'>
                        {this.props.error.message}
                    </div>
                )}
                <input
                    type='text'
                    className='form-control'
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <button className='btn btn-primary'>Add my message</button>
            </form>
        );
    }
}

const mapStateToProps = ({ errors }) => {
    return {
        errors,
    };
};

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
