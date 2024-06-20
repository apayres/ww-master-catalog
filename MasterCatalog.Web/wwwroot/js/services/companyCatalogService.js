import { ApiUtility } from '../utilities/apiHelper.js';
import { CatalogItem } from '../models/catalogItem.js';

const _api = new ApiUtility('companycatalog');

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
        const response = await _api.get({ id: itemId }, 'ByItem');
        const items = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return items;
    }

    async items(id) {
        const response = await _api.get({ id }, 'items');
        const items = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return items;
    }

    mapToModel(obj) {
        const catelogItem = new CatalogItem(
            obj.companyCatalogID,
            obj.companyID,
            obj.itemID,
            obj.retailPrice
        );

        return catelogItem;
    }
}