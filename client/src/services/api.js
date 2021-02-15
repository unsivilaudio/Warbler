import axios from 'axios';

const instance = axios.create();

const setTokenHeader = token => {
    if (token) {
        console.log('setTokenHeader was called.');
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('deleteTokenHeader was called');
        delete instance.defaults.headers.common['Authorization'];
    }
};

const apiCall = async (type, url, data) => {
    let headers = await instance.defaults.headers.common;
    try {
        const response = await instance[type](url, data, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export { setTokenHeader, apiCall };
