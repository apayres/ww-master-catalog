import { CompanyCatalogService } from '/js/services/companyCatalogService.js';
import { CatalogItem } from '/js/models/catalogItem.js';
import { ErrorHandler } from '/js/utilities/errorHandler.js';
import { default as MessageCenter } from '../../Shared/Components/MessageCenter/MessageCenter.js';

const _service = new CompanyCatalogService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,
    dialog: null,
    saveCallback: null,
    catalogItem: null,

    data() {
        return {
            retailPrice: Number,
            itemPriceError: String
        }
    },
    components: {
        MessageCenter
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