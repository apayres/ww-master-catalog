export class Company {
    companyID;
    companyName;
    companyNameError;
    companyCode;
    companyCodeError;

    constructor(id, name, code) {
        this.companyID = id;
        this.companyName = name;
        this.companyCode = code;
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const name = this.companyName;
        if (!name) {
            this.companyNameError = 'Company name is Required.';
            valid = false;
        }

        const code = this.companyCode;
        if (!code) {
            this.companyCodeError = 'Company code is Required.';
            valid = false;
        }
        else if (code.length !== 10) {
            this.companyCodeError = 'Company code must be 10 characters.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.companyNameError = null;
        this.companyCodeError = null;
    }
}