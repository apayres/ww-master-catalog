import { ApiUtility } from '../utilities/apiHelper.js';
import { CatalogItem } from '../models/catalogItem.js';
import { ItemService } from './itemService.js';

const _api = new ApiUtility('companycatalog');
const _itemService = new ItemService();

export class CompanyCatalogService {

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

    async getByCompany(id) {
        const response = await _api.get({ id });
        const items = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return items;
    }

    async getByCompanyAndItem(companyId, itemId) {
        const response = await _api.get({ companyId, itemId });
        return this.mapToModel(response.data);
    }

    async getByItem(itemId) {
        const response = await _api.get(null, 'ByItem/' + itemId);
        const items = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return items;
    }

    async items(id) {
        const response = await _api.get(null, 'items/' + id);
        const items = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return items;
    }

    mapToModel(obj) {
        const catalogItem = new CatalogItem(
            obj.companyCatalogID,
            obj.companyID,
            obj.itemID,
            obj.retailPrice
        );
        
        const item = _itemService.mapToModel(obj);
        catalogItem.itemName = item.itemName;
        catalogItem.itemDescription = item.itemDescription;
        catalogItem.unitQuantity = item.unitQuantity;
        catalogItem.unitOfMeasureID = item.unitOfMeasureID;
        catalogItem.unitOfMeasure = item.unitOfMeasure;
        catalogItem.images = item.images;
        catalogItem.upc = item.upc;
        catalogItem.categoryID = item.categoryID;
        catalogItem.category = item.category;
        catalogItem.attributes = item.attributes;
        
        return catalogItem;
    }
}