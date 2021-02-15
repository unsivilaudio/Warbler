import { apiCall, setTokenHeader } from '../services/api';
import localStorage from 'local-storage';
import { SET_CURRENT_USER } from './types';
import { addError } from './errors';

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user,
    };
};

export const setAuthorizationToken = token => {
    setTokenHeader(token);
};

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
};

export const authUser = (type, userData) => dispatch => {
    return new Promise((resolve, reject) => {
        return apiCall('post', `/api/auth/${type}`, userData)
            .then(({ token, ...user }) => {
                localStorage.set('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                resolve();
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject();
            });
    });
};
