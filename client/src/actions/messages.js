import { apiCall } from '../services/api';
import { addError } from './errors';
import { REMOVE_MESSAGE, LOAD_MESSAGES } from './types';

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages,
});

export const remove = id => ({
    type: REMOVE_MESSAGE,
    id,
});

export const removeMessage = (user_id, message_id) => dispatch => {
    return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
        .then(() => dispatch(remove(message_id)))
        .catch(err => dispatch(addError(err.message)));
};

export const fetchMessages = () => dispatch =>
    apiCall('get', '/api/messages')
        .then(res =>
            dispatch(loadMessages(res)).catch(err => addError(err.message))
        )
        .catch(err => {
            dispatch(addError(err.message));
        });

export const postNewMessage = text => (dispatch, getState) => {
    let { user } = getState();
    const id = user.user.id;
    return apiCall('post', `/api/users/${id}/messages`, { text })
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
};
