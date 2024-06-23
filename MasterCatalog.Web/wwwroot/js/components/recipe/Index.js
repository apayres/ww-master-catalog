import { createApp } from 'vue';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { default as IngredientGrid } from './IngredientGrid.js';
import { Item } from '../../models/item.js';
import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';

const _itemService = new ItemService();
const _errorHandler = new ErrorHandler();

createApp({
    messageCenter: null,
    itemId: null,

    data() {
        return {
            model: new Item(),
            loading: true
        }
    },

    components: {
        IngredientGrid,
        MessageCenter
    },

    methods: {
        loadItem() {
            const self = this;
            if (!self.itemId) {
                self.loading = false;
                return false;
            }

            _itemService.getById(self.itemId)
                .then(function (item) {
                    self.model = item;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem loading the item.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        }
    },
    mounted() {
        this.itemId = document.getElementById('itemID').value;
        this.loadItem();
    }
}).mount('#content');