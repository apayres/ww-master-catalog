import { ButtonPrimary, ButtonPrimaryOutlined, ButtonIcon } from '../shared/buttons/Index.js';
import { FormFieldPlaceholder } from '../Shared/Placeholders/Index.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { ItemAttributeService } from '../../services/itemAttributeService.js';
import { ItemAttributeValueService } from '../../services/itemAttributeValueService.js';
import { ItemAttributeValue } from '../../models/itemAttributeValue.js';
import { default as ItemAttributeSelector } from './ItemAttributeSelector.js';
import { default as ItemAttributeOrderEditor } from './ItemAttributeOrderEditor.js';
import { default as ItemAttributeRecord } from './ItemAttributeRecord.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';

const _attributeService = new ItemAttributeService();
const _attributeValueService = new ItemAttributeValueService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,

    data() {
        return {
            attributes: [],
            loading: true,
            itemID: null
        }
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon,
        MessageCenter,
        ItemAttributeSelector,
        ItemAttributeRecord,
        ItemAttributeOrderEditor,
        FormFieldPlaceholder
    },
    methods: {
        loadAttributes(itemID) {
            const self = this;

            if (!itemID) {
                this.loading = false;
                return false;
            }

            self.itemID = itemID;
            _attributeService.getItemAttributes(itemID)
                .then(function (attributes) {
                    self.attributes = attributes;
                    self.attributes.forEach((obj) => {
                        obj.useWithItem = obj.attributeValue && obj.attributeValue.itemAttributeValueID > 0;
                    });

                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'There was a problem loading attributes!');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        deleteAttributeValue(attribute) {
            const self = this;


            if (!attribute.attributeValue || !attribute.attributeValue.itemAttributeValueID) {
                return false;
            }

            _attributeValueService.delete(attribute.attributeValue.itemAttributeValueID)
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'There was a problem deleting image!');
                    self.messageCenter.error(msg);
                })
        },
        openAttributeSelector() {
            const self = this;
            const dialog = self.$refs.attributeSelector;
            
            dialog.show((selectedAttributes) => {
                self.loading = true;

                self.attributes.forEach((obj) => {
                    const id = obj.itemAttributeID;
                    const item = selectedAttributes.filter((attr) => {
                        return attr.itemAttributeID === id;
                    });

                    if (item.length) {
                        obj.useWithItem = true;
                        if (!obj.attributeValue) {
                            obj.attributeValue = new ItemAttributeValue();
                        }
                    }
                    else {
                        obj.useWithItem = false;
                        self.deleteAttributeValue(obj);
                    }
                });

                self.loading = false;
            });
        },
        openAttributeOrderEditor() {
            self = this;
            const dialog = self.$refs.attributeOrderEditor;

            dialog.show((orderedAttributes) => {
                self.attributes = orderedAttributes;
            });
        }
    },
    computed: {
        itemAttributes() {
            const filteredAttributes = this.attributes.filter((obj) => { return obj.useWithItem === true });
            return filteredAttributes;
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="p-3">
            <div class="row mb-3">
                <div class="col-6">
                    <h4>Attributes</h4>
                </div>
                <div class="col-6 text-end">
                    <button-icon
                        text="Manage"
                        icon="bi-list"
                        tooltip="Manage attributes"
                        :disabled="loading"
                        v-if="itemID && attributes.length"
                        v-on:click-event="openAttributeSelector">
                    </button-icon>

                    <button-icon
                        text="Sort"
                        icon="bi-arrow-down-up"
                        tooltip="Update sorting"
                        :disabled="loading"
                        classes="ms-3"
                        v-if="itemAttributes.length > 1"
                        v-on:click-event="openAttributeOrderEditor">
                    </button-icon>
                </div>
            </div>

            <message-center ref="messageCenter"></message-center>

            <div v-if="!loading && !itemID">
                <div class="alert alert-light" role="alert">Attributes can be added once item has been created</div>
            </div>

            <div v-if="!loading && itemID && !itemAttributes.length">
                <div class="alert alert-light" role="alert">Click 'Manage' above to add item attributes</div>
            </div>

            <div v-if="loading">
                <form-field-placeholder :show="true"></form-field-placeholder>
                <form-field-placeholder :show="true"></form-field-placeholder>
                <form-field-placeholder :show="true"></form-field-placeholder>
                <form-field-placeholder :show="true"></form-field-placeholder>
            </div>

            <div v-if="!loading" class="mb-3" v-for:="attr in itemAttributes">
                <item-attribute-record
                    :attribute-record="attr"
                    :item-id="itemID">
                </item-attribute-record>
            </div>

            <item-attribute-selector
                :all-attributes="attributes"
                ref="attributeSelector">
            </item-attribute-selector>

            <item-attribute-order-editor
                ref="attributeOrderEditor"
                :attributes="itemAttributes">
            </item-attribute-order-editor>
        </div>
    `
}