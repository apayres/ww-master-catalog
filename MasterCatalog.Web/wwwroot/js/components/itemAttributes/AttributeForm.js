import { ButtonPrimary, ButtonPrimaryOutlined, ButtonIcon } from '../shared/buttons/Index.js';
import { TextBox, DropDownList } from '../shared/inputs/Index.js';
import { ItemAttribute } from '../../models/itemAttribute.js';
import { ItemAttributeOption } from '../../models/itemAttributeOption.js';

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
        ButtonIcon,
        TextBox,
        DropDownList
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
            if (!this.attributeOption.attributeOption) {
                return false;
            }

            if (this.model.attributeOptions == null) {
                this.model.attributeOptions = [];
            }

            this.model.attributeOptions.push(
                new ItemAttributeOption(null, this.model.itemAttributeID, this.attributeOption.attributeOption)
            );

            console.log(this.model.attributeOptions);
            this.attributeOption = new ItemAttributeOption(null, this.model.itemAttributeID, null);
            console.log(this.model.attributeOptions);
        },
        removeOption(index) {
            this.model.attributeOptions.splice(index, 1);
        }
    },
    computed: {
        dataTypeOptions() {
            return [
                { name: "None", id: 0 },
                { name: "Boolean", id: 1 },
                { name: "Multi-Select", id: 2 },
                { name: "Text", id: 3 },
                { name: "Number", id: 4 }
            ];
        }
    },
    template: `
        <div class="p-3">
            <h4 class="mb-3">Item Attribute</h4>
            <form id="attributeForm" v-on:submit.prevent>
                <div class="mb-2">
                    <text-box
                        label="Name"
                        tooltip="Attribute Name"
                        v-model:value="model.attributeName"
                        :error="model.attributeNameError"
                        :disabled="processing">
                    </text-box>
                </div>

                <div class="mb-3">
                    <text-box
                        label="Description"
                        tooltip="Attribute Description"
                        v-model:value="model.attributeDescription"
                        :error="model.attributeDescriptionError"
                        :disabled="processing">
                    </text-box>
                </div>

                <div class="mb-3">
                    <drop-down-list
                        label="Data Type"
                        text-binding="name"
                        value-binding="id"
                        tooltip="Attribute Data Type"
                        :options="dataTypeOptions"
                        :error="model.attributeDataTypeIDError"
                        v-model:value="model.attributeDataTypeID"
                    </drop-down-list>
                </div>

                <div v-if:="model.attributeDataTypeID == 2">
                    <h5 class="mb-3">Options</h5>
                    <div class="row mb-2" v-for:="(option, index) in model.attributeOptions">
                        <div class="col-10">
                            <text-box v-model:value="option.attributeOption"></text-box>
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
                            <text-box v-model:value="attributeOption.attributeOption"></text-box>
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