import request from 'request-promise';

import Constants from '../config/Constants';

const setBasicAuth = () => {
    const buffer = new Buffer(`${Constants.USERNAME}:${Constants.PASSWORD}`);
    const credentials = buffer.toString('base64');
    return { Authorization: `Basic ${credentials}`};
};

const get = async (url) => {
    const headers = setBasicAuth();
    return request({
        url,
        method: 'GET',
        json: true,
        headers
    });
};

const post = async (url, body) => {
    const headers = setBasicAuth();
    return request({
        url,
        method: 'POST',
        body,
        json: true,
        headers
    });
};

const put = async (url, body) => {
    const headers = setBasicAuth();
    return request({
        url,
        method: 'PUT',
        body,
        json: true,
        headers
    });
};


export {
    get,
    post,
    put
};
