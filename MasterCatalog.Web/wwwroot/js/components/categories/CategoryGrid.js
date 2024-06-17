import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';
import { default as TablePlaceholder } from '../Shared/Placeholders/TablePlaceholder.js';
import { default as DialogConfirmation } from '../Shared/Dialogs/DialogConfirmation.js'

export default {
    props: {
        categories: Array,
        processing: Boolean
    },
    components: {
        ButtonIcon,
        TablePlaceholder,
        DialogConfirmation
    },
    methods: {
        updateClick(category) {
            if (this.processing) {
                return false;
            }

            this.$emit('edit-item', category);
        },
        deleteClick(id) {
            if (this.processing) {
                return false;
            }

            const self = this;
            const dialog = this.$refs.confirmationDialog;

            dialog.show('Are you sure you want to delete this Category?',
                // YES CALLBACK
                function () {
                    self.$emit('delete-item', id);
                },
                // NO CALLBACK
                function () {
                    return false;
                }
            );
        },
        getFormattedCategoryName(category) {
            return category.parentCategory ? category.parentCategory.categoryName + ' > ' + category.categoryName : category.categoryName;
        }
    },
    template: `
    <div>
        <table-placeholder
            :show="processing"
            rows="5"
            columns="3">
        </table-placeholder>

        <table class="table" v-if="!processing">
            <thead>
                <tr>
                    <th class="p-3">Name</th>
                    <th class="p-3" colspan="2">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for:="category in categories">
                    <td class="p-3">{{ getFormattedCategoryName(category) }}</td>
                    <td class="p-3">{{category.categoryDescription}}</td>
                    <td class="p-3 text-end" style="min-width: 120px">                       

                        <button-icon
                            icon="bi-pencil"
                            tooltip="update category"
                            text="Edit"
                            classes="text-secondary"
                            :disabled="processing"
                            v-on:click-event="updateClick(category)">
                        </button-icon>

                        <button-icon
                            icon="bi-trash"
                            tooltip="delete category"
                            text="Delete"
                            :disabled="processing"
                            classes="text-danger ms-3"
                            v-on:click-event="deleteClick(category.categoryID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
    </div>
    `
}