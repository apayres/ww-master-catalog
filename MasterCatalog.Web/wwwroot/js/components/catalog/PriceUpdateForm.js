import { CompanyCatalogService } from '../../services/companyCatalogService.js';
import { CatalogItem } from '../../models/catalogItem.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { ButtonPrimary, ButtonPrimaryOutlined } from '../shared/buttons/Index.js';
import { MoneyTextBox } from '../shared/inputs/Index.js';

const _service = new CompanyCatalogService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,
    dialog: null,
    saveCallback: null,
    catalogItem: null,

    data() {
        return {
            retailPrice: null,
            itemPriceError: ''
        }
    },
    components: {
        MessageCenter,
        ButtonPrimary,
        ButtonPrimaryOutlined,
        MoneyTextBox
    },
    methods: {
        saveClick() {
            const self = this;
            if (!self.retailPrice) {
                self.itemPriceError = 'Price is required';
                return false;
            }

            self.updateItemCost();
        },
        cancelClick() {
            this.dialog.hide();
        },
        show(catalogItem, callback) {
            this.itemPriceError = null;
            this.retailPrice = catalogItem.retailPrice;
            this.catalogItem = catalogItem;
            this.dialog.show();
            this.saveCallback = callback;
        },
        updateItemCost() {
            const self = this;
            const obj = new CatalogItem(
                self.catalogItem.companyCatalogID,
                self.catalogItem.companyID,
                self.catalogItem.itemID,
                self.retailPrice
            );

            _service.update(obj)
                .then(function (response) {
                    self.catalogItem.retailPrice = self.retailPrice;
                    self.saveCallback(self.catalogItem);
                    self.dialog.hide();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('priceUpdater'), {
            backdrop: 'static',
            keyboard: false
        });

        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="modal fade" id="priceUpdater" tabindex="-1" aria-labelledby="priceUpdaterLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="priceUpdaterLabel">Update Retail Price</h1>
                    </div>
                    <div class="modal-body">
                        <message-center ref="messageCenter"></message-center>
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