import { createApp } from 'vue';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
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
                    const msg = _errorHandler.getMessage(error, "Could not load item.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        }
    },
    mounted() {
        const self = this;
        self.itemId = document.getElementById('itemID').value;
        self.loadItem();
    }
}).mount('#content');