import { ApiUtility } from '../utilities/apiHelper.js';
import { ItemAttribute } from '../models/itemAttribute.js';
import { ItemAttributeOption } from '../models/itemAttributeOption.js';
import { ItemAttributeValue } from '../models/itemAttributeValue.js';

const _api = new ApiUtility('itemattribute');

export class ItemAttributeService {

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
        const attributes = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return attributes;
    }

    async getItemAttributes(id) {
        const response = await _api.get(null, 'ByItem/' + id);
        const attributes = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return attributes;
    }

    mapToModel(obj) {
        const attr = new ItemAttribute(
            obj.itemAttributeID,
            obj.attributeName,
            obj.attributeDescription,
            obj.attributeDataTypeID,
            []
        );

        if (obj.attributeOptions) {
            attr.attributeOptions = obj.attributeOptions.map((opt) => {
                return new ItemAttributeOption(
                    opt.itemAttributeOptionID,
                    obj.itemAttributeID,
                    opt.attributeOption
                );
            });
        }

        if (obj.attributeValue) {
            attr.attributeValue = new ItemAttributeValue(
                obj.attributeValue.itemAttributeValueID,
                obj.attributeValue.itemID,
                obj.attributeValue.itemattributeValueID,
                obj.attributeValue.attributeValue,
                obj.attributeValue.displayOrder
            );
        }

        return attr;
    }
}