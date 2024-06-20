import axios from 'axios';

const buildUrl = async (path) => {

    if (window.ApiBaseUrl) {
        return window.ApiBaseUrl + path;
    }

    const promise = await axios.get('/Configuration/Index');
    window.ApiBaseUrl = promise.data.apiBaseUrl;

    return window.ApiBaseUrl + path;
}

export class ApiUtility {
    _path = '';

    constructor(path) {
        this._path = path;
    }
    
    async insert(data) {
        const url = await buildUrl(this._path);
        return axios.post(url, data);
    }

    async upload(data) {
        const url = await buildUrl(this._path);
        return axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    async update(data) {
        const url = await buildUrl(this._path);
        return axios.put(url, data);
    }

    async delete(id, data) {
        let url = await buildUrl(this._path);

        if (data) {
            let params = [];
            for (const prop in data) {
                params.push(`${prop}=${data[prop]}`);
            }

            return axios.delete(url + '?' + params.join('&'));
        }

        return axios.delete(url + '/' + id);
    }
    
    async get(data, pathAddendum) {
        let url = await buildUrl(this._path);
        if (pathAddendum) {
            url = url + '/' + pathAddendum;
        }

        if (data) {
            let params = [];
            for (const prop in data) {
                params.push(`${prop}=${data[prop]}`);
            }

            return axios.get(url + '?' + params.join('&'));
        }

        return axios.get(url);
    }
}
