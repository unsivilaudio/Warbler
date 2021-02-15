import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends React.Component {
    componentDidMount() {
        this.props.fetchMessages();
    }

    renderMessageList = messages =>
        messages.map(m => {
            return (
                <MessageItem
                    key={m._id}
                    date={m.createdAt}
                    text={m.text}
                    username={m.user.username}
                    profileImageUrl={m.profileImageUrl}
                    removeMessage={this.props.removeMessage.bind(
                        this,
                        m.user._id,
                        m._id
                    )}
                    isCorrectUser={this.props.currentUser === m.user._id}
                />
            );
        });

    render() {
        const { messages } = this.props;

        return (
            <div className='row col-sm-10'>
                <div className='offset-1 col-sm-10'>
                    <ul className='list-group' id='messages'>
                        {messages ? this.renderMessageList(messages) : ''}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ messages, user }) => {
    return { messages, currentUser: user.user.id };
};

export default connect(mapStateToProps, { fetchMessages, removeMessage })(
    MessageList
);
