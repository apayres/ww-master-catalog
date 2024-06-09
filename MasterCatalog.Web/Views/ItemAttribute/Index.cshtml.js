import { createApp, toRaw } from 'vue';
import { ItemAttributeService } from '/js/services/itemAttributeService.js';
import { ErrorHandler } from '/js/utilities/errorHandler.js';
import { ItemAttribute } from '/js/models/itemAttribute.js';
import { default as ButtonPrimary } from '../Shared/Components/Buttons/ButtonPrimary.js';
import { default as MessageCenter } from '../Shared/Components/MessageCenter/MessageCenter.js';
import { default as AttributeGrid } from './Components/AttributeGrid.js';
import { default as AttributeForm } from './Components/AttributeForm.js';

const _service = new ItemAttributeService();
const _errorHandler = new ErrorHandler();

createApp({
    messageCenter: null,

    data() {
        return {
            form: {
                model: new ItemAttribute()
            },
            attributes: [],
            processing: true
        }
    },
    components: {
        ButtonPrimary,
        MessageCenter,
        AttributeGrid,
        AttributeForm
    },
    methods: {
        addAttribute(attribute) {
            const self = this;
            self.processing = true;
            attribute.attributeValue = null;

            _service.insert(toRaw(attribute))
                .then(function (response) {
                    self.attributes.push(response.data);
                    self.messageCenter.success('Item Attribute added successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.resetForm();
                    self.processing = false;
                });
        },
        updateAttribute(attribute) {
            const self = this;
            self.processing = true;
            attribute.attributeValue = null;

            _service.update(toRaw(attribute))
                .then(function (response) {
                    const updatedAttribute = response.data;
                    const index = self.attributes.findIndex((x) => x.itemAttributeID == updatedAttribute.itemAttributeID);

                    if (index > -1) {
                        self.attributes[index] = updatedAttribute;
                    }

                    self.messageCenter.success('Item Attribute updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.resetForm();
                    self.processing = false;
                });
        },
        deleteAttribute(id) {
            const self = this;
            self.processing = true;

            _service.delete(id)
                .then(function (response) {
                    const index = self.attributes.findIndex((x) => x.itemAttributeID == id);
                    if (index > -1) {
                        self.attributes.splice(index, 1);
                    }

                    self.messageCenter.success('Item Attribute deleted successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        loadForm(attribute) {
            this.form.model = new ItemAttribute(
                attribute.itemAttributeID,
                attribute.attributeName,
                attribute.attributeDescription,
                attribute.attributeDataTypeID,
                attribute.attributeOptions
            );
        },
        resetForm() {
            this.form.model = new ItemAttribute()
        }
    },
    mounted() {
        const self = this;
        self.messageCenter = this.$refs.messageCenter;

        _service.get()
            .then(function (response) {
                self.attributes = response.data;
            })
            .catch(function (error) {
                const msg = _errorHandler.getMessage(error);
                self.messageCenter.error(msg);
            })
            .finally(function () {
                self.processing = false;
            });
    }
}).mount('#content');