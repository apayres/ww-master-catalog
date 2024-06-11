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
                .then(function (response) {
                    self.companies.push(response.data);
                    self.messageCenter.success('Company added successfully!');
                })
                .catch(function (error) {
                    console.log(error);
                    const msg = _errorHandler.getMessage(error);
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
                .then(function (response) {
                    const updatedCompany = response.data;
                    const index = self.companies.findIndex((x) => x.companyID == updatedCompany.companyID);

                    if (index > -1) {
                        self.companies[index] = updatedCompany;
                    }

                    self.messageCenter.success('Company updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
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
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        loadForm(company) {
            this.form.model = new Company(
                company.companyID,
                company.companyName
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
            .then(function (response) {
                self.companies = response.data;
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