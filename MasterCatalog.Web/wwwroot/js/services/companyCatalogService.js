import { ApiUtility } from '../utilities/apiHelper.js';

const _url = window.ApiBaseUrl + 'companycatalog';
const repo = new ApiUtility();

export class CompanyCatalogService {

    insert(obj) {
        return repo.insert(_url, obj);
    }

    update(obj) {
        return repo.update(_url, obj);
    }

    delete(id) {
        return repo.delete(_url, id);
    }

    getByCompany(id) {
        return repo.get(_url + '?id=' + id);
    }

    getByCompanyAndItem(companyId, itemId) {
        return repo.get(_url + '?companyId=' + companyId + '&itemId=' + itemId);
    }

    getByItem(itemId) {
        return repo.get(_url + '/ByItem/' + itemId);
    }

    items(id) {
        return repo.get(_url + '/items/' + id);
    }
}