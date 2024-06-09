import { ItemAttributeValue } from './itemAttributeValue.js';

export class ItemAttribute {
    itemAttributeID;
    attributeName;
    attributeNameError;
    attributeDescription;
    attributeDescriptionError;
    attributeDataTypeID;
    attributeDataTypeIDError;
    attributeOptions = [];
    attributeValue = {};
    useWithItem = false;

    constructor(id, name, description, typeId, options, value) {
        this.itemAttributeID = id;
        this.attributeName = name;
        this.attributeDescription = description;
        this.attributeDataTypeID = typeId;
        this.attributeOptions = options;
        this.attributeValue = !value ? new ItemAttributeValue() : value;
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const name = this.attributeName;
        if (!name) {
            this.attributeNameError = 'Attribute name is Required.';
            valid = false;
        }

        const description = this.attributeDescription;
        if (!description) {
            this.attributeDescriptionError = 'Attribute description is Required.';
            valid = false;
        }

        const type = this.attributeDataTypeID;
        if (!type) {
            this.attributeDataTypeIDError = 'Attribute data type is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.attributeNameError = null;
        this.attributeDescriptionError = null;
        this.attributeDataTypeIDError = null;
    }
}