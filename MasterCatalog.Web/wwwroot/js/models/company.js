export class Company {
    companyID;
    companyName;
    companyNameError;

    constructor(id, name) {
        this.companyID = id;
        this.companyName = name;
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const name = this.companyName;
        if (!name) {
            this.companyNameError = 'Company name is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.companyNameError = null;
    }
}