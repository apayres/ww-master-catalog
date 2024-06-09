import axios from 'axios';

export class ApiUtility {

    insert(url, data) {
        return axios.post(url, data);
    }

    upload(url, data) {
        return axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    update(url, data) {
        return axios.put(url, data);
    }

    delete(url, id) {
        return axios.delete(url + '/' + id);
    }

    get(url, data) {
        if (data) {
            return axios.get(url, data);
        }

        return axios.get(url);
    }
}
