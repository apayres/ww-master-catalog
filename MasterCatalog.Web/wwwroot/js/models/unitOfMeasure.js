export class UnitOfMeasure {
    unitOfMeasureID;
    unitOfMeasureName;
    unitOfMeasureNameError;
    unitOfMeasureDescription;
    unitOfMeasureDescriptionError;

    constructor(id, name, description) {
        this.unitOfMeasureID = id;
        this.unitOfMeasureName = name;
        this.unitOfMeasureDescription = description;
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const name = this.unitOfMeasureName;
        if (!name) {
            this.unitOfMeasureNameError = 'Unit of Measure Name is Required.';
            valid = false;
        }

        const description = this.unitOfMeasureDescription;
        if (!description) {
            this.unitOfMeasureDescriptionError = 'Unit of Measure Description is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.unitOfMeasureDescriptionError = null;
        this.unitOfMeasureNameError = null;
    }
}