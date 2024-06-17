import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';
import { Category } from '../../models/category.js';

export default {
    props: {
        model: Category,
        categories: Array,
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
            console.log(this.model);
            this.$emit('update-item', this.model);
        },
        cancelClick() {
            this.$emit('cancel-form-action');
        },
        getFormattedCategoryName(category) {
            return category.parentCategory ? category.parentCategory.categoryName + ' > ' + category.categoryName : category.categoryName;
        }
    },
    computed: {
        categoryList() {
            const self = this;
            let categories = [];

            if (!self.model.categoryID) {
                categories = self.categories;
            }
            else {
                categories = self.categories.filter((x) => x.categoryID !== self.model.categoryID);
            }
            
            return categories.filter((x) => !x.parentCategory);
        }
    },
    template: `
        <div class="p-3">
            <h4 class="mb-3">Category</h4>
            <form id="categoryForm" v-on:submit.prevent>
                <div class="mb-2">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="model.categoryName" />
                    <span class="text-danger" v-if="model.categoryNameError">{{model.categoryNameError}}</span>
                </div>

                <div class="mb-2">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="model.categoryDescription" />
                    <span class="text-danger" v-if="model.categoryDescriptionError">{{model.categoryDescriptionError}}</span>
                </div>

                <div class="mb-2">
                    <label class="form-label">Parent</label>
                    <select class="form-select" v-model="model.parentCategoryID" :disabled="categoryList.length === 0">
                        <option :value="null">None</option>
                        <option v-for:="option in categoryList" class="mt-2" :value="option.categoryID">
                            {{option.categoryName}}
                        </option>
                    </select>
                </div>

                <div class="mt-4">
                    <button-primary
                        text="Add"
                        icon="bi-plus-circle"
                        :disabled="processing"
                        v-if="!model.categoryID"
                        v-on:click-event="addClick">
                    </button-primary>
                                    
                    <button-primary
                        text="Save"
                        icon="bi-floppy-fill"
                        :disabled="processing"
                        v-if="model.categoryID"
                        v-on:click-event="updateClick">
                    </button-primary>

                    <span class="me-2"></span>

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