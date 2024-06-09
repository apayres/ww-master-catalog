import { ApiUtility } from '../utilities/apiHelper.js';
import { Item } from '../models/item.js';

const _url = window.ApiBaseUrl + 'item';
const repo = new ApiUtility();

export class ItemService {

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
        return repo.get(_url + '/' + id);
    }

    mapResponseToModel(response) {
        const item = new Item(
            response.itemID,
            response.itemName,
            response.itemDescription,
            response.unitQuantity
        );

        item.unitOfMeasureID = response.unitOfMeasureID;
        item.unitOfMeasure = response.unitOfMeasure;
        item.attributes = [];
        item.images = [];
        item.upc = response.upc;
        return item;
    }
}