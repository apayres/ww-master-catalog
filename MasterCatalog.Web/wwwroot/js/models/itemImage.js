export class ItemImage {
    itemImageID;
    itemID;
    absoluteUri;
    displayOrder;

    constructor(id, itemID, absoluteUri, displayOrder) {
        this.itemImageID = id;
        this.itemID = itemID;
        this.absoluteUri = absoluteUri;
        this.displayOrder = displayOrder;
    }
}