import { createApp } from 'vue';
import { default as CatalogGrid } from './Components/CatalogGrid.js';
import { default as PriceUpdateForm } from './Components/PriceUpdateForm.js'
import { default as MessageCenter } from '../Shared/Components/MessageCenter/MessageCenter.js';


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
        const self = this;
        self.messageCenter = this.$refs.messageCenter;
        self.updatePriceForm = this.$refs.updatePriceForm;
        self.catalogGrid = this.$refs.catalogGrid;
    }
}).mount('#content');