import { createApp, toRaw } from 'vue';
import { ItemAttributeService } from '../../services/itemAttributeService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { ItemAttribute } from '../../models/itemAttribute.js';
import { default as ButtonPrimary } from '../shared/buttons/ButtonPrimary.js';
import { default as MessageCenter } from '../Shared/messageCenter/MessageCenter.js';
import { default as AttributeGrid } from './AttributeGrid.js';
import { default as AttributeForm } from './AttributeForm.js';

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
                .then(function (attribute) {
                    self.attributes.push(attribute);
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
                .then(function (updatedAttribute) {
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
            .then(function (attributes) {
                self.attributes = attributes;
            })
            .catch(function (error) {
                const msg = _errorHandler.getMessage(error, "Could not load attributes.");
                self.messageCenter.error(msg);
            })
            .finally(function () {
                self.processing = false;
            });
    }
}).mount('#content');