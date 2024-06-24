import { CompanyCatalogService } from '../../services/companyCatalogService.js';
import { CompanyService } from '../../services/companyService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { CatalogItem } from '../../models/catalogItem.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { DropDownList, MoneyTextBox } from '../shared/inputs/Index.js';
import { ButtonPrimary, ButtonPrimaryOutlined } from '../shared/buttons/Index.js';

const _companyService = new CompanyService();
const _catalogService = new CompanyCatalogService();
const _errorHandler = new ErrorHandler();

export default {
    dialog: null,
    saveCallback: null,

    data() {
        return {
            companies: [],
            selectedCompanyID: null,
            selectedCompanyIDError: '',
            retailPrice: null,
            itemPriceError: ''
        }
    },
    props: {
        itemId: Number
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        MessageCenter,
        DropDownList,
        MoneyTextBox
    },
    methods: {
        loadCompanies() {
            const self = this;

            _companyService.get()
                .then(function (companies) {
                    self.companies = companies;
                    self.filterCompanies();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg, "There was a problem loading the companies.");
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        filterCompanies() {
            const self = this;

            _catalogService.getByItem(self.itemId)
                .then(function (catalog) {
                    catalog.forEach((catalogEntry) => {
                        const index = self.companies.findIndex((x) => x.companyID == catalogEntry.companyID);
                        if (index > -1) {
                            self.companies.splice(index, 1);
                        }
                    });
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem loading the item catalog.");
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
                    const msg = _errorHandler.getMessage(error, "There was a problem adding the item to the company catalog.");
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

                        <div class="mb-4 col-6">                            
                            <drop-down-list
                                label="Company"
                                text-binding="companyName"
                                value-binding="companyID"
                                :error="selectedCompanyIDError"
                                :options="companies"
                                :disabled="companies.length === 0"
                                v-model:value="selectedCompanyID"
                            </drop-down-list>
                        </div>
                        <div class="col-4">
                            <money-text-box
                                label="Retail Price"
                                tooltip="Retail Price"
                                v-model:value="retailPrice"
                                :error="itemPriceError">
                            </money-text-box>
                        </div>                        
                    </div>
                    <div class="modal-footer">
                        <button-primary
                            text="Save"
                            icon="bi-floppy-fill"
                            classes="me-2"
                            v-on:click-event="saveClick">
                        </button-primary>

                        <button-primary-outlined
                            text="Cancel"
                            icon="bi-ban"
                            v-on:click="cancelClick">
                        </button-primary-outlined>
                    </div>
                </div>
            </div>
        </div>
    `
}