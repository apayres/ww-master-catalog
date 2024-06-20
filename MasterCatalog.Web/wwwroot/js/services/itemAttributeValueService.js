import { ApiUtility } from '../utilities/apiHelper.js';
import { ItemAttributeValue } from '../models/itemAttributeValue.js';

const _api = new ApiUtility('itemattributevalue');

export class ItemAttributeValueService {
    async getbyItemId(id) {
        const response = await _api.get({ itemId: id });
        return this.mapToModel(response.data);
    }

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

    mapToModel(obj) {
        const attrValue = new ItemAttributeValue(
            obj.itemAttributeValueID,
            obj.itemID,
            obj.itemAttributeID,
            obj.attributeValue,
            obj.displayOrder
        );

        return attrValue;
    }
}