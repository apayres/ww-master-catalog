import { ButtonPrimary, ButtonPrimaryOutlined } from '../shared/buttons/Index.js';
import { TextBox } from '../shared/inputs/Index.js';
import { Company } from '../../models/company.js';

export default {
    props: {
        model: Company,
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
            <h4 class="mb-3">Company</h4>
            <form id="uomForm" v-on:submit.prevent>
                <div class="mb-2">
                    <text-box
                        label="Name"
                        tooltip="Company Name"
                        v-model:value="model.companyName"
                        :error="model.companyNameError"
                        :disabled="processing">
                    </text-box>
                </div>
                <div class="mb-2">
                    <text-box
                        label="Code"
                        tooltip="Company Code"
                        v-model:value="model.companyCode"
                        :error="model.companyCodeError"
                        :disabled="processing">
                    </text-box>
                </div>

                <div class="mt-4">
                    <button-primary
                        text="Add"
                        icon="bi-plus-circle"
                        classes="me-2"
                        :disabled="processing"
                        v-if="!model.companyID"
                        v-on:click-event="addClick">
                    </button-primary>
                                    
                    <button-primary
                        text="Save"
                        icon="bi-floppy-fill"
                        classes="me-2"
                        :disabled="processing"
                        v-if="model.companyID"
                        v-on:click-event="updateClick">
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