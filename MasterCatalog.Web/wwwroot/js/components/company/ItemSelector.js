import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';

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
            processing: true
        }
    },
    props: {
        catalogItems: Array
    },
    components: {
        MessageCenter
    },
    methods: {
        loadItems() {
            const self = this;

            _service.get()
                .then(function (response) {
                    const items = response.data;
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
        filterItems(items) {
            const catalogedItems = this.catalogItems;
            
            if (!catalogedItems) {
                this.selectorItems = items;
                return true;
            }

            this.selectorItems = items.filter((obj) => {
                return catalogedItems.findIndex((x) => x.itemID == obj.itemID) == -1;
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
                        <ul class="list-group">
                            <li class="list-group-item" v-for:="item in selectorItems">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" :value="item.itemID" v-model="selectedItems">
                                    {{ item.itemName }} ({{ item.upc }})
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="addClick" class="btn btn-primary">Add</button>
                        <button type="button" v-on:click="cancelClick" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `
}