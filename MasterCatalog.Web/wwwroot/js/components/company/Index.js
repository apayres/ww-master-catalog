import { createApp, toRaw } from 'vue';
import { CompanyService } from '../../services/companyService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { Company } from '../../models/company.js';
import { default as CompanyForm } from './CompanyForm.js';
import { default as CompanyGrid } from './CompanyGrid.js';
import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as MessageCenter } from '../shared/messageCenter/MessageCenter.js';

const _service = new CompanyService();
const _errorHandler = new ErrorHandler();

createApp({
    messageCenter: null,

    data() {
        return {
            form: {
                model: new Company()
            },
            companies: [],
            processing: true
        }
    },
    components: {
        CompanyForm,
        CompanyGrid,
        ButtonPrimary,
        MessageCenter
    },
    methods: {
        addCompany(company) {
            const self = this;
            self.processing = true;

            _service.insert(toRaw(company))
                .then(function (insertedCompany) {
                    self.companies.push(insertedCompany);
                    self.messageCenter.success('Company added successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "Error inserting company.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.form.model = new Company()
                    self.processing = false;
                });
        },
        updateCompany(company) {
            const self = this;
            self.processing = true;

            _service.update(toRaw(company))
                .then(function (updatedCompany) {
                    const index = self.companies.findIndex((x) => x.companyID == updatedCompany.companyID);

                    if (index > -1) {
                        self.companies[index] = updatedCompany;
                    }

                    self.messageCenter.success('Company updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "Error updating company");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.resetForm();
                    self.processing = false;
                });
        },
        deleteCompany(id) {
            const self = this;
            self.processing = true;

            _service.delete(id)
                .then(function (response) {
                    const index = self.companies.findIndex((x) => x.companyID == id);
                    if (index > -1) {
                        self.companies.splice(index, 1);
                    }

                    self.messageCenter.success('Company deleted successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "Error deleting company");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        loadForm(company) {
            this.form.model = new Company(
                company.companyID,
                company.companyName,
                company.companyCode
            );
        },
        resetForm() {
            this.form.model = new Company()
        }
    },
    mounted() {
        const self = this;
        self.messageCenter = this.$refs.messageCenter;

        _service.get()
            .then(function (companies) {
                self.companies = companies;
            })
            .catch(function (error) {
                const msg = _errorHandler.getMessage(error);
                self.messageCenter.error(msg);
            })
            .finally(function () {
                self.processing = false;
            });
    }
}).mount('#content');