import { CompanyCatalogService } from '../../services/companyCatalogService.js';
import { CompanyService } from '../../services/companyService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { CatalogItem } from '../../models/catalogItem.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';

const _companyService = new CompanyService();
const _catalogService = new CompanyCatalogService();
const _errorHandler = new ErrorHandler();

export default {
    dialog: null,
    saveCallback: null,

    data() {
        return {
            companies: [],
            selectedCompanyID: Number,
            selectedCompanyIDError: String,
            retailPrice: Number,
            itemPriceError: String
        }
    },
    props: {
        itemId: Number
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        MessageCenter
    },
    methods: {
        loadCompanies() {
            const self = this;

            _companyService.get()
                .then(function (response) {
                    self.companies = response.data;
                    self.filterCompanies();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        filterCompanies() {
            const self = this;

            _catalogService.getByItem(self.itemId)
                .then(function (response) {
                    const catalog = response.data;

                    catalog.forEach((catalogEntry) => {
                        const index = self.companies.findIndex((x) => x.companyID == catalogEntry.companyID);
                        if (index > -1) {
                            self.companies.splice(index, 1);
                        }
                    });
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        saveClick() {
            if (!this.selectedCompanyID) {
                this.selectedCompanyIDError = 'Company is required';
                return false;
            }

            if (!this.retailPrice) {
                this.itemPriceError = 'Price is required';
                return false;
            }

            const self = this;
            const obj = new CatalogItem(
                null,
                self.selectedCompanyID,
                self.itemId,
                self.retailPrice
            );

            _catalogService.insert(obj)
                .then(function (response) {
                    self.saveCallback();
                    self.dialog.hide();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });

        },
        cancelClick() {
            this.dialog.hide();
        },
        show(callback) {
            this.loadCompanies();
            this.dialog.show();
            this.saveCallback = callback;
            this.selectedCompanyID = 0;
            this.retailPrice = null;
            this.itemPriceError = null;
            this.selectedCompanyIDError = null;
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('companySelector'), {
            backdrop: 'static',
            keyboard: false
        });

        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="modal fade" id="companySelector" tabindex="-1" aria-labelledby="companySelectorLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="companySelectorLabel">Add to Company Catalog</h1>
                    </div>
                    <div class="modal-body">
                        <message-center ref="messageCenter"></message-center>
                        <div class="mb-4">
                            <label class="form-label">Company</label>
                            <select class="form-select" v-model="selectedCompanyID">
                                <option value="0">Select Company...</option>
                                <option v-for:="company in companies" :value="company.companyID">{{ company.companyName }}</option>
                            </select>
                            <span class="text-danger" v-if="selectedCompanyIDError">{{ selectedCompanyIDError }}</span>
                        </div>
                        <label class="form-label">Retail Price</label>
                        <div class="col-3">
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="text" class="form-control" v-model="retailPrice" />
                            </div>
                        </div>
                        <span class="text-danger" v-if="itemPriceError">{{ itemPriceError }}</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="saveClick" class="btn btn-primary">Save</button>
                        <button type="button" v-on:click="cancelClick" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `
}