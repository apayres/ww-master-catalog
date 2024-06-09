export class ItemAttributeOption {
    itemAttributeOptionID;
    itemAttributeID;
    attributeOption;
    attributeOptionError;

    constructor(id, attributeId, option) {
        this.itemAttributeOptionID = id;
        this.itemAttributeID = attributeId;
        this.attributeOption = option;
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const option = this.attributeOption;
        if (!option) {
            this.attributeOptionError = 'Option is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.attributeOptionError = null;
    }
}