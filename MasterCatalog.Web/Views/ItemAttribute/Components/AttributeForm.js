import { default as ButtonPrimary } from '../../Shared/Components/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../../Shared/Components/Buttons/ButtonPrimaryOutlined.js';
import { default as ButtonIcon } from '../../Shared/Components/Buttons/ButtonIcon.js';
import { ItemAttribute } from '/js/models/itemAttribute.js';
import { ItemAttributeOption } from '/js/models/itemAttributeOption.js';

export default {
    data() {
        return {
            attributeOption: new ItemAttributeOption()
        }
    },
    props: {
        model: ItemAttribute,
        processing: Boolean,
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon
    },
    methods: {
        addClick() {
            if (!this.model.validate()) {
                return false;
            }

            this.$emit('add-item', this.model);
        },
        updateClick() {
            if (!this.model.validate()) {
                return false;
            }

            this.$emit('update-item', this.model);
        },
        cancelClick() {
            this.$emit('cancel-form-action');
        },
        addOption() {
            const option = this.attributeOption.attributeOption;
            if (!option) {
                return false;
            }

            if (this.model.attributeOptions == null) {
                this.model.attributeOptions = [];
            }

            this.model.attributeOptions.push(
                new ItemAttributeOption(null, this.model.itemAttributeID, option)
            );

            this.attributeOption = new ItemAttributeOption(null, this.model.itemAttributeID, null);
        },
        removeOption(index) {
            this.model.attributeOptions.splice(index, 1);
        }
    },
    template: `
        <div class="p-3">
            <h4 class="mb-3">Item Attribute</h4>
            <form id="attributeForm" v-on:submit.prevent>
                <div class="mb-2">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="model.attributeName" />
                    <span class="text-danger" v-if="model.attributeNameError">{{model.attributeNameError}}</span>
                </div>

                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="model.attributeDescription" />
                    <span class="text-danger" v-if="model.attributeDescriptionError">{{model.attributeDescriptionError}}</span>
                </div>

                <div class="mb-3">
                    <label class="form-label">Data Type</label>
                    <select class="form-select" v-model="model.attributeDataTypeID">
                            <option value="0">None</option>
                            <option value="1">Boolean (Yes/No)</option>
                            <option value="2">Multi-Select</option>
                            <option value="3">Text</option>
                            <option value="4">Number</option>
                    </select>

                    <span class="text-danger" v-if="model.attributeDataTypeIDError">{{model.attributeDataTypeIDError}}</span>
                </div>

                <div v-if:="model.attributeDataTypeID == 2">
                    <h5 class="mb-3">Options</h5>
                    <div class="row mb-2" v-for:="(option, index) in model.attributeOptions">
                        <div class="col-10">
                            <input type="text" class="form-control" v-model="option.attributeOption" />
                        </div>
                        <div class="col-2 pt-1">
                            <button-icon
                                icon="bi-x-lg"
                                tooltip="remove item attribute option"
                                :disabled="processing"
                                classes="text-danger"
                                v-on:click-event="removeOption(index)">
                            </button-icon>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-10">
                            <input type="text" class="form-control" v-model="attributeOption.attributeOption" />
                        </div>
                        <div class="col-2 pt-1">
                            <button-icon
                                icon="bi-plus-lg"
                                tooltip="add item attribute option"
                                :disabled="processing"
                                v-on:click-event="addOption">
                            </button-icon>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <button-primary
                        text="Add"
                        icon="bi-plus-circle"
                        :disabled="processing"
                        v-if="!model.itemAttributeID"
                        v-on:click-event="addClick"
                        classes="me-2">
                    </button-primary>
                                    
                    <button-primary
                        text="Save"
                        icon="bi-floppy-fill"
                        :disabled="processing"
                        v-if="model.itemAttributeID"
                        v-on:click-event="updateClick"
                        classes="me-2">
                    </button-primary>

                    <button-primary-outlined
                        text="Cancel"
                        icon="bi-ban"
                        :disabled="processing"
                        v-on:click="cancelClick">
                    </button-primary-outlined>
                </div>
            </form>
        </div>
    `
}