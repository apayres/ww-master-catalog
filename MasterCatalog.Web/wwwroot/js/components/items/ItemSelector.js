﻿import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { ButtonPrimary, ButtonPrimaryOutlined, ButtonIcon } from '../shared/buttons/Index.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { Pagination } from '../shared/pagination/Index.js';
import { SearchTextBox } from '../shared/inputs/Index.js';


const _service = new ItemService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,
    dialog: null,
    addCallback: null,

    data() {
        return {
            selectorItems: [],
            selectedItems: [],
            processing: true,
            pageNumber: 1,
            itemsPerPage: 10,
            numberOfPages: 0,
            searchTerm: ''
        }
    },
    props: {
        catalogItems: Array
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon,
        MessageCenter,
        Pagination,
        SearchTextBox
    },
    methods: {
        loadItems() {
            const self = this;

            _service.get()
                .then(function (items) {
                    self.filterItems(items);
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        addClick() {
            this.addCallback(this.selectedItems);
            this.dialog.hide();
        },
        cancelClick() {
            this.dialog.hide();
        },
        show(callback) {
            this.loadItems();
            this.dialog.show();
            this.selectedItems = [];
            this.addCallback = callback;
        },
        searchClick() {

        },
        filterItems(items) {
            const catalogedItems = this.catalogItems;

            if (!catalogedItems) {
                this.selectorItems = items;
                return true;
            }

            this.selectorItems = items.filter((obj) => {
                return catalogedItems.findIndex((x) => x.itemID == obj.itemID) == -1;
            });

            this.formatPagination(this.selectorItems);
        },
        formatPagination(items) {
            const numberOfPages = items.length / this.itemsPerPage;
            const numberOfPagesRounded = Math.round(numberOfPages);

            if (numberOfPages > numberOfPagesRounded) {
                this.numberOfPages = numberOfPagesRounded + 1;
            }
            else {
                this.numberOfPages = numberOfPagesRounded;
            }
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
                filteredItems = this.selectorItems;
            }
            else {
                term = term.toLowerCase();
                filteredItems = this.selectorItems.filter((obj) => {
                    return obj.itemName.toLowerCase().indexOf(term) >= 0
                        || obj.upc.toLowerCase().indexOf(term) >= 0;
                });
            }

            this.formatPagination(filteredItems);

            const startingIndex = this.pageNumber === 1 ? 0 : (this.itemsPerPage * (this.pageNumber - 1));
            const length = startingIndex + this.itemsPerPage;

            return filteredItems.filter(function (el, i) {
                return i >= startingIndex && i < length;
            });
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('itemSelector'), {
            backdrop: 'static',
            keyboard: false
        });

        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="modal fade" id="itemSelector" tabindex="-1" aria-labelledby="itemSelectorLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="itemSelectorLabel">Available Items</h1>
                    </div>
                    <div class="modal-body">
                        <message-center ref="messageCenter"></message-center>

                        <div class="col-6 mb-3">
                            <search-text-box
                                placeholder="Search items..."
                                v-model:value="searchTerm"
                                :event="searchClick"
                                :disabled="processing">
                            </search-text-box>
                        </div>

                        <ul class="list-group mb-2">
                            <li class="list-group-item" v-for:="item in filteredItems">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" :value="item.itemID" v-model="selectedItems">
                                    {{ item.itemName }} ({{ item.upc }})
                                </label>
                            </li>
                        </ul>

                        <pagination
                          :page-count="numberOfPages"
                          :current-page="pageNumber"
                          v-on:click-event="paginationClick">
                        </pagination>

                    </div>
                    <div class="modal-footer">
                        <button-primary
                            text="Add"
                            icon="bi-floppy-fill"
                            classes="me-2"
                            v-on:click-event="addClick">
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