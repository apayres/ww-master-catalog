export class ItemAttributeValue {
    itemAttributeValueID;
    itemID;
    itemAttributeID;
    attributeValue;
    displayOrder;

    constructor(itemAttributeValueID, itemID, itemAttributeID, attributeValue, displayOrder) {
        this.itemAttributeValueID = itemAttributeValueID;
        this.itemID = itemID;
        this.itemAttributeID = itemAttributeID;
        this.attributeValue = attributeValue;
        this.displayOrder = displayOrder;
    }
}