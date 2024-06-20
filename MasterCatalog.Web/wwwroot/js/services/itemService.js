import { ApiUtility } from '../utilities/apiHelper.js';
import { Item } from '../models/item.js';

const _api = new ApiUtility('item');

export class ItemService {

    async insert(obj) {
        const response = await _api.insert(obj);
        return this.mapToModel(response.data);
    }

    async update(obj) {
        const response = await _api.update(obj);
        return this.mapToModel(response.data);
    }

    async delete(id) {
        return _api.delete(id);
    }

    async get() {
        const response = await _api.get();
        const items = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return items;
    }

    async getById(id) {
        const response = await _api.get(null, id);
        return this.mapToModel(response.data);
    }

    mapToModel(response) {
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
        item.categoryID = response.categoryID;
        item.category = response.category;
        return item;
    }
}