import { default as ButtonIcon } from '../../Shared/Components/Buttons/ButtonIcon.js';
import { default as MessageCenter } from '../../Shared/Components/MessageCenter/MessageCenter.js';
import { default as ItemGridHeader } from './ItemGridHeader.js';
import { default as TablePlaceholder } from '../../Shared/Components/Placeholders/TablePlaceholder.js';

import { ItemService } from '/js/services/itemService.js';
import { ErrorHandler } from '/js/utilities/errorHandler.js';

const _itemService = new ItemService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,

    data() {
        return {
            loading: true,
            items: [],
            searchTerm: '',
        }
    },
    props: {
        defaultSearchTerm: String
    },
    components: {
        TablePlaceholder,
        ButtonIcon,
        MessageCenter,
        ItemGridHeader
    },
    methods: {
        addItem() {
            window.location.href = "/Items/Index";
        },
        searchItems(term) {
            this.searchTerm = term;
        },
        loadItems() {
            const self = this;

            _itemService.get()
                .then(function (response) {
                    self.items = response.data;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Could not load items');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        viewClick(id) {
            window.location.href = '/Items/Index/' + id;
            return false;
        }
    },
    computed: {
        filteredItems() {
            let term = this.searchTerm;
            if (!term) {
                return this.items;
            }

            term = term.toLowerCase();
            return this.items.filter((obj) => {
                return obj.itemName.toLowerCase().indexOf(term) >= 0
                    || obj.upc.toLowerCase().indexOf(term) >= 0
                    || obj.itemDescription.toLowerCase().indexOf(term) >= 0;
            });
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;
        this.searchTerm = this.defaultSearchTerm ? this.defaultSearchTerm : '';
        this.loadItems();
    },
    template: `
    <div>
        <message-center ref="messageCenter"></message-center>

        <item-grid-header
            v-on:search-click="searchItems"
            v-on:add-click="addItem"
            :provided-search-term="searchTerm"
            :loading="loading">
        </item-grid-header>

        <table-placeholder
            :show="loading"
            rows="10"
            columns="4">
        </table-placeholder>

        <table class="table" v-if="!loading">
            <thead>
                <tr>
                    <th class="p-3">Upc</th>
                    <th class="p-3">Name</th>
                    <th class="p-3">Description</th>
                    <th class="p-3">Unit of Measure</th>
                    <th class="p-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for:="item in filteredItems">
                    <td class="p-3">{{item.upc}}</td>
                    <td class="p-3">{{item.itemName}}</td>
                    <td class="p-3">{{item.itemDescription}}</td>
                    <td class="p-3">{{item.unitOfMeasure && item.unitOfMeasure.unitOfMeasureName}} ({{ item.unitQuantity }})</td>
                    <td class="p-3 text-end">
                        <button-icon
                            icon="bi-list"
                            text="Details"
                            v-on:click-event="viewClick(item.itemID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
}