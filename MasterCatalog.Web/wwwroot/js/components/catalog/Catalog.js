import { createApp } from 'vue';
import { MessageCenter } from '../shared/messageCenter/Index.js';
import { default as CatalogGrid } from './CatalogGrid.js';
import { default as PriceUpdateForm } from './PriceUpdateForm.js'

createApp({
    messageCenter: null,
    updatePriceForm: null,
    catalogGrid: null,

    components: {
        CatalogGrid,
        PriceUpdateForm,
        MessageCenter
    },
    methods: {
        updatePrice(catalogItem) {
            const self = this;

            self.updatePriceForm.show(catalogItem, function (updatedCatalogItem) {
                self.messageCenter.success('Catalog price saved successfully!');
                self.catalogGrid.updateItemRecord(updatedCatalogItem);
            });
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;
        this.updatePriceForm = this.$refs.updatePriceForm;
        this.catalogGrid = this.$refs.catalogGrid;
    }
}).mount('#content');