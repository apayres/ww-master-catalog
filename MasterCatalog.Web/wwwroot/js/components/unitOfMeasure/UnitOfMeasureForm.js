import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';
import { UnitOfMeasure } from '../../models/unitOfMeasure.js';

export default {
    props: {
        model: UnitOfMeasure,
        processing: Boolean
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined
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
            <form id="uomForm" v-on:submit.prevent>
                <div class="mb-2">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="model.unitOfMeasureName" />
                    <span class="text-danger" v-if="model.unitOfMeasureNameError">{{model.unitOfMeasureNameError}}</span>
                </div>

                <div class="mb-2">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="model.unitOfMeasureDescription" />
                    <span class="text-danger" v-if="model.unitOfMeasureDescriptionError">{{model.unitOfMeasureDescriptionError}}</span>
                </div>

                <div class="mt-4">
                    <button-primary text="Add"
                                    icon="bi-plus-circle"
                                    :disabled="processing"
                                    v-if="!model.unitOfMeasureID"
                                    v-on:click-event="addClick"></button-primary>
                                    
                    <button-primary text="Save"
                                    icon="bi-floppy-fill"
                                    :disabled="processing"
                                    v-if="model.unitOfMeasureID"
                                    v-on:click-event="updateClick"></button-primary>

                    <span class="me-2"></span>

                    <button-primary-outlined text="Cancel"
                                    icon="bi-ban"
                                    :disabled="processing"
                                    v-on:click="cancelClick"></button-primary-outlined>
                </div>

                <input type="hidden" v-model="model.unitOfMeasureID" />
            </form>
        </div>
    `
}