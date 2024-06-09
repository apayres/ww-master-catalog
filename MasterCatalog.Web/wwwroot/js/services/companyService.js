import { ApiUtility } from '../utilities/apiHelper.js';

const _url = window.ApiBaseUrl + 'company';
const repo = new ApiUtility();

export class CompanyService {

    insert(obj) {
        return repo.insert(_url, obj);
    }

    update(obj) {
        return repo.update(_url, obj);
    }

    delete(id) {
        return repo.delete(_url, id);
    }

    get() {
        return repo.get(_url);
    }

    getById(id) {
        return repo.get(_url + '?id=' + id);
    }
}