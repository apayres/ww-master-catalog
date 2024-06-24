import { ButtonPrimary, ButtonPrimaryOutlined } from '../shared/buttons/Index.js';
import { TextBox } from '../shared/inputs/Index.js';
import { UnitOfMeasure } from '../../models/unitOfMeasure.js';

export default {
    props: {
        model: UnitOfMeasure,
        processing: Boolean
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        TextBox
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
        }
    },
    template: `
        <div class="p-3">
            <h4 class="mb-3">Unit of Measure</h4>
            <div class="mb-2">
                <text-box
                    label="Name"
                    tooltip="Unit of Measure Name"
                    v-model:value="model.unitOfMeasureName"
                    :error="model.unitOfMeasureNameError"
                    :disabled="processing">
                </text-box>
            </div>

            <div class="mb-2">
                <text-box
                    label="Description"
                    tooltip="Unit of Measure Description"
                    v-model:value="model.unitOfMeasureDescription"
                    :error="model.unitOfMeasureDescriptionError"
                    :disabled="processing">
                </text-box>
            </div>

            <div class="mt-4">
                <button-primary
                    text="Add"
                    icon="bi-plus-circle"
                    classes="me-2"
                    :disabled="processing"
                    v-if="!model.unitOfMeasureID"
                    v-on:click-event="addClick">
                </button-primary>
                                    
                <button-primary
                    text="Save"
                    icon="bi-floppy-fill"
                    classes="me-2"
                    :disabled="processing"
                    v-if="model.unitOfMeasureID"
                    v-on:click-event="updateClick">
                </button-primary>

                <button-primary-outlined
                    text="Cancel"
                    icon="bi-ban"
                    :disabled="processing"
                    v-on:click="cancelClick">
                </button-primary-outlined>
            </div>
        </div>
    `
}