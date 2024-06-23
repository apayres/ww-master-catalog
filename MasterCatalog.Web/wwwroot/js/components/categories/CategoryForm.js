import { ButtonPrimary, ButtonPrimaryOutlined } from '../shared/buttons/Index.js';
import { TextBox, DropDownList } from '../shared/inputs/Index.js';
import { Category } from '../../models/category.js';

export default {
    props: {
        model: Category,
        categories: Array,
        processing: Boolean
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
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
        }
    },
    computed: {
        categoryList() {
            const self = this;
            let categories = self.categories;

            if (self.model.categoryID) {
                categories = self.categories.filter((x) => x.categoryID !== self.model.categoryID);
            }
            
            return categories.filter((x) => !x.parentCategory);
        }
    },
    template: `
        <div class="p-3">
            <h4 class="mb-3">Category</h4>
            <div class="mb-2">
                <text-box
                    label="Name"
                    tooltip="Category Name"
                    v-model:value="model.categoryName"
                    :error="model.categoryNameError"
                    :disabled="processing">
                </text-box>
            </div>

            <div class="mb-2">
                <text-box
                    label="Description"
                    tooltip="Category Description"
                    v-model:value="model.categoryDescription"
                    :error="model.categoryDescriptionError"
                    :disabled="processing">
                </text-box>
            </div>

            <div class="mb-2">                    
                <drop-down-list
                    label="Parent"
                    text-binding="categoryName"
                    value-binding="categoryID"
                    tooltip="Parent Category"
                    :options="categoryList"
                    :disabled="categoryList.length === 0"
                    v-model:value="model.parentCategoryID"
                </drop-down-list>
            </div>

            <div class="mt-4">
                <button-primary
                    text="Add"
                    icon="bi-plus-circle"
                    classes="me-2"
                    :disabled="processing"
                    v-if="!model.categoryID"
                    v-on:click-event="addClick">
                </button-primary>
                                    
                <button-primary
                    text="Save"
                    icon="bi-floppy-fill"
                    classes="me-2"
                    :disabled="processing"
                    v-if="model.categoryID"
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