import { ApiUtility } from '../utilities/apiHelper.js';

const _url = window.ApiBaseUrl + 'itemattributevalue';
const repo = new ApiUtility();

export class ItemAttributeValueService {
    getbyItemId(id) {
        return repo.get(_url + '?itemId=' + id);
    }

    insert(obj) {
        return repo.insert(_url, obj);
    }

    update(obj) {
        return repo.update(_url, obj);
    }

    delete(id) {
        return repo.delete(_url, id);
    }
}