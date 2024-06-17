import { ApiUtility } from '../utilities/apiHelper.js';

const _url = window.ApiBaseUrl + 'category';
const repo = new ApiUtility();

export class CategoryService {

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
}