import { createApp } from 'vue';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { Item } from '../../models/item.js';
import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { default as ItemDetails } from './ItemDetails.js';
import { default as ItemAttributes } from './ItemAttributes.js';
import { default as ItemImages } from './ItemImages.js';
import { default as ItemRecipe } from './ItemRecipe.js';

const _itemService = new ItemService();
const _errorHandler = new ErrorHandler();

createApp({
    messageCenter: null,
    itemId: null,

    data() {
        return{
            model: new Item(),
            loading: true
        }
    },

    components: {
        ItemDetails,
        ItemAttributes,
        ItemImages,
        ItemRecipe,
        MessageCenter
    },

    methods: {
        loadItem(completeCallback) {
            const self = this;
            if (!self.itemId) {
                self.loading = false;
                completeCallback();
                return false;
            }

            _itemService.getById(self.itemId)
                .then(function (item) {
                    self.model = item;
                    completeCallback();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was as problem loading the items.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        }
    },
    watch: {
        'model.itemID'(val, oldVal) {
            if (val == oldVal) {
                return false;
            }

            this.model.itemID = val;
            if (val == null) {
                this.model = new Item();
            }

            this.$refs.itemAttributes.loadAttributes(val);
            this.$refs.itemImages.loadImages(this.model);
            this.$refs.itemRecipe.loadRecipe(val);
        }
    },
    mounted() {
        const self = this;
        self.itemId = document.getElementById('itemID').value;

        self.loadItem(() => {
            self.$refs.itemAttributes.loadAttributes(self.model.itemID);
            self.$refs.itemImages.loadImages(self.model);
            self.$refs.itemRecipe.loadRecipe(self.model.itemID);
        });
    }
}).mount('#content');