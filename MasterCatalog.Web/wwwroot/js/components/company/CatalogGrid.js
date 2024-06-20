import { CompanyCatalogService } from '../../services/companyCatalogService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { CatalogItem } from '../../models/catalogItem.js';

import { default as MessageCenter } from '../shared/MessageCenter/MessageCenter.js';
import { default as ButtonIcon } from '../shared/Buttons/ButtonIcon.js';
import { default as TablePlaceholder } from '../shared/Placeholders/TablePlaceholder.js';
import { default as DialogConfirmation } from '../shared/Dialogs/DialogConfirmation.js'
import { default as ItemSelector } from './ItemSelector.js';
import { default as CatalogGridHeader } from './CatalogGridHeader.js';

const _service = new CompanyCatalogService();
const _errorHandler = new ErrorHandler();

export default {
    itemSelector: null,
    messageCenter: null,

    data() {
        return {
            catalogItems: [],
            loading: true,
            searchTerm: String
        }
    },
    props: {
        companyId: Number
    },
    components: {
        ButtonIcon,
        TablePlaceholder,
        DialogConfirmation,
        ItemSelector,
        MessageCenter,
        CatalogGridHeader
    },
    methods: {
        loadCatalogItems() {
            const self = this;

            _service.items(self.companyId)
                .then(function (items) {
                    self.catalogItems = items;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Could not load catalog items');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        searchItems(term) {
            this.searchTerm = term;
        },
        showItemSelector() {
            const self = this;
            let refreshGrid = false;

            this.itemSelector.show(function (items) {
                const length = items.length;
                if (!length) {
                    return false;
                }

                let index = 1;
                items.forEach((id) => {
                    refreshGrid = index === length;

                    self.addCatalogItem(self.companyId, id, refreshGrid);
                    index++;
                });
            });
        },
        addCatalogItem(companyId, itemId, refreshGrid) {
            const self = this;
            self.loading = true;

            _service.insert(new CatalogItem(null, companyId, itemId, 0))
                .then(function (response) {
                    if (refreshGrid) {
                        self.loadCatalogItems(self.companyId);
                        self.messageCenter.success('Item(s) added to catalog successfully!');
                    }
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Item could not be added to catalog.');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        updateItemRecord(catalogItem) {
            const index = this.catalogItems.findIndex((x) => x.companyCatalogID == catalogItem.companyCatalogID);
            this.catalogItems[index] = catalogItem;
        },
        deleteCatalogItem(id) {
            const self = this;
            self.loading = true;

            _service.delete(id)
                .then(function (response) {
                    const index = self.catalogItems.findIndex((x) => x.companyCatalogID == id);
                    if (index > -1) {
                        self.catalogItems.splice(index, 1);
                    }

                    self.messageCenter.success('Catalog Item deleted successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Could not delete catalog item.');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        updatePriceClick(catalogItem) {
            if (this.loading) {
                return false;
            }

            this.$emit('update-price', catalogItem);
        },
        deleteClick(id) {
            if (this.loading) {
                return false;
            }

            const self = this;
            const dialog = this.$refs.confirmationDialog;

            dialog.show('Are you sure you want to delete this item from the catalog?',
                // YES CALLBACK
                function () {
                    self.deleteCatalogItem(id);
                },
                // NO CALLBACK
                function () {
                    return false;
                }
            );
        }
    },
    computed: {
        filteredItems() {
            let term = this.searchTerm;
            if (!term) {
                return this.catalogItems;
            }

            term = term.toLowerCase();
            return this.catalogItems.filter((obj) => {
                return obj.itemName.toLowerCase().indexOf(term) >= 0 || obj.upc.toLowerCase().indexOf(term) >= 0 || obj.itemDescription.toLowerCase().indexOf(term) >= 0;
            });
        }
    },
    beforeMount() {
        this.loadCatalogItems();
        this.searchTerm = '';
    },
    mounted() {
        this.itemSelector = this.$refs.itemSelector;
        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
    <div>
        <message-center ref="messageCenter"></message-center>
        <catalog-grid-header
            v-on:search-click="searchItems"
            v-on:add-click="showItemSelector"
            :provided-search-term="searchTerm"
            :loading="loading">
        </catalog-grid-header>

        <item-selector
            :catalog-items="catalogItems"
            ref="itemSelector">
        </item-selector>

        <table-placeholder
            :show="loading"
            rows="5"
            columns="6">
        </table-placeholder>

        <table class="table" v-if="!loading">
            <thead>
                <tr>
                    <th class="p-3">Name</th>
                    <th class="p-3">Upc</th>
                    <th class="p-3">Description</th>
                    <th class="p-3">Unit of Measure</th>
                    <th class="p-3">Packsize</th>
                    <th class="p-3" colspan="2">Retail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for:="item in filteredItems">
                    <td class="p-3">{{item.itemName}}</td>
                    <td class="p-3">{{item.upc}}</td>
                    <td class="p-3">{{item.itemDescription}}</td>
                    <td class="p-3">{{item.unitOfMeasure.unitOfMeasureName}}</td>
                    <td class="p-3">{{item.unitQuantity}}</td>
                    <td class="p-3">\${{item.retailPrice}} <i v-if="item.retailPrice === 0" class="bi bi-exclamation-diamond text-warning" title="No price set."></i> </td>
                    <td class="p-3 text-end" style="width: 140px">
                        <button-icon
                            icon="bi-pencil"
                            tooltip="update price"
                            text="Price"
                            classes="text-secondary"
                            :disabled="loading"
                            v-on:click-event="updatePriceClick(item)">
                        </button-icon>

                        <button-icon
                            icon="bi-trash"
                            tooltip="delete from catalog"
                            text="Delete"
                            :disabled="loading"
                            classes="text-danger ms-3"
                            v-on:click-event="deleteClick(item.companyCatalogID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
    </div>
    `
}