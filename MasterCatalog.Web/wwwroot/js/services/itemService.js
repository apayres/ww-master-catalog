import { ApiUtility } from '../utilities/apiHelper.js';
import { Item } from '../models/item.js';
import { CategoryService } from './categoryService.js';
import { UnitOfMeasureService } from './unitOfMeasureService.js';
import { ItemAttributeService } from './itemAttributeService.js';

const _api = new ApiUtility('item');
const _categoryService = new CategoryService();
const _unitOfMeasureService = new UnitOfMeasureService();
const _itemAttributeService = new ItemAttributeService();

export class ItemService {

    async insert(obj) {
        const response = await _api.insert(obj);
        return this.mapToModel(response.data);
    }

    async update(obj) {
        obj.unitOfMeasure = null;
        obj.category = null;
        obj.attributes = [];

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
        item.images = [];
        item.upc = response.upc;
        item.categoryID = response.categoryID;

        if (response.attributes) {
            item.attributes = response.attributes.map((attr) => {
                return _itemAttributeService.mapToModel(attr);
            });
        }

        if (response.unitOfMeasure) {
            item.unitOfMeasure = _unitOfMeasureService.mapToModel(response.unitOfMeasure);
        }

        if (response.category) {
            item.category = _categoryService.mapToModel(response.category);
        }
        
        return item;
    }
}