export class Item {
    itemID;
    upc;
    upcError;
    itemName;
    itemNameError;
    itemDescription;
    unitOfMeasureID;
    unitOfMeasureIDError;
    unitQuantity;
    unitQuantityError;
    categoryID;
    categoryIDError;
    attributes;
    images;
    unitOfMeasure;
    category;


    constructor(id, name, description, qty) {
        this.itemID = id;
        this.itemName = name;
        this.itemDescription = description;
        this.unitQuantity = qty;
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const name = this.itemName;
        if (!name) {
            this.itemNameError = 'Item name is Required.';
            valid = false;
        }

        const upc = this.upc;
        if (!upc) {
            this.upcError = 'Upc is Required.';
            valid = false;
        }

        const qty = this.unitQuantity;
        if (!qty) {
            this.unitQuantityError = 'Quantity is Required.';
            valid = false;
        }

        const uom = this.unitOfMeasureID;
        if (!uom) {
            this.unitOfMeasureIDError = 'Unit of Measure is Required.';
            valid = false;
        }

        const category = this.categoryID;
        if (!category) {
            this.categoryIDError = 'Category is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.itemNameError = null;
        this.upcError = null;
        this.unitQuantityError = null;
        this.unitOfMeasureIDError = null;
        this.categoryIDError = null;
    }
}