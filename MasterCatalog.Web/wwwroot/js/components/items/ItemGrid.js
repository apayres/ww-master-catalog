﻿import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { default as ItemGridHeader } from './ItemGridHeader.js';
import { default as TablePlaceholder } from '../Shared/Placeholders/TablePlaceholder.js';
import { default as Pagination } from '../shared/pagination/Pagination.js';
import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';


const _itemService = new ItemService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,

    data() {
        return {
            loading: true,
            items: [],
            searchTerm: '',
            pageNumber: 1,
            itemsPerPage: 10,
            numberOfPages: 0
        }
    },
    props: {
        defaultSearchTerm: String
    },
    components: {
        TablePlaceholder,
        ButtonIcon,
        MessageCenter,
        ItemGridHeader,
        Pagination 
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
                    const numberOfPages = self.items.length / self.itemsPerPage;
                    const numberOfPagesRounded = Math.round(numberOfPages);

                    if (numberOfPages > numberOfPagesRounded) {
                        self.numberOfPages = numberOfPagesRounded + 1;
                    }
                    else {
                        self.numberOfPages = numberOfPagesRounded;
                    }
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
        },
        paginationClick(pageNumber) {
            this.pageNumber = pageNumber;
        }
    },
    computed: {
        filteredItems() {
            let term = this.searchTerm;
            let filteredItems = [];

            if (!term) {
                filteredItems = this.items;
            }
            else {
                term = term.toLowerCase();
                filteredItems = this.items.filter((obj) => {
                    return obj.itemName.toLowerCase().indexOf(term) >= 0
                        || obj.upc.toLowerCase().indexOf(term) >= 0
                        || obj.itemDescription.toLowerCase().indexOf(term) >= 0;
                });
            }

            const startingIndex = this.pageNumber === 1 ? 0 : (this.itemsPerPage * (this.pageNumber - 1));
            const length = startingIndex + this.itemsPerPage;

            return filteredItems.filter(function (el, i) {
                return i >= startingIndex && i < length;
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

        <pagination
          :page-count="numberOfPages"
          :current-page="pageNumber"
          v-on:click-event="paginationClick">
        </pagination>

    </div>
    `
}