import { Item } from './item.js';

export class CatalogItem extends Item {
    retailPrice;
    companyID;
    companyCatalogID;

    constructor(companyCatalogID, companyId, itemId, price) {
        super(itemId);

        this.companyCatalogID = companyCatalogID;
        this.companyID = companyId;
        this.itemID = itemId;
        this.retailPrice = price;
    }
}