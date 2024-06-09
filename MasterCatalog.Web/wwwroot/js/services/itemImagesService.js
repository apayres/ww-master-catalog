import { ApiUtility } from '../utilities/apiHelper.js';

const _url = window.ApiBaseUrl + 'itemimages';
const repo = new ApiUtility();

export class ItemImagesService {

    upload(obj) {
        return repo.upload(_url, obj);
    }

    update(obj) {
        return repo.update(_url, obj);
    }

    delete(id, upc) {
        return repo.delete(_url, '?id=' + id + '&upc=' + upc);
    }

    getItemImages(id) {
        return repo.get(_url + '/' + id);
    }
}