import { default as ButtonIcon } from '../../Shared/Components/Buttons/ButtonIcon.js';
import { default as TablePlaceholder } from '../../Shared/Components/Placeholders/TablePlaceholder.js';
import { default as DialogConfirmation } from '../../Shared/Components/Dialogs/DialogConfirmation.js'

export default {
    props: {
        items: Array,
        processing: Boolean
    },
    components: {
        ButtonIcon,
        TablePlaceholder,
        DialogConfirmation
    },
    methods: {
        updateClick(item) {
            if (this.processing) {
                return false;
            }

            this.$emit('edit-item', item);
        },
        deleteClick(id) {
            if (this.processing) {
                return false;
            }

            const self = this;
            const dialog = this.$refs.confirmationDialog;

            dialog.show('Are you sure you want to delete this Attribute?',
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
        dataTypeName(record) {
            switch (record.attributeDataTypeID) {
                case 1:
                    return "Boolean (Yes/No)";
                case 2:
                    return "Multi-Select";
                case 3:
                    return "Text";
                case 4:
                    return "Number";
                default:
                    return "None"
            }
        }
    },
    template: `
    <div>
        <table-placeholder
            :show="processing"
            rows="5"
            columns="4">
        </table-placeholder>

        <table class="table" v-if="!processing">
            <thead>
                <tr>
                    <th class="p-3">Name</th>
                    <th class="p-3">Description</th>
                    <th class="p-3" colspan="2">Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for:="attribute in items">
                    <td class="p-3">{{attribute.attributeName}}</td>
                    <td class="p-3">{{attribute.attributeDescription}}</td>
                    <td class="p-3">{{dataTypeName(attribute)}}</td>
                    <td class="p-3 text-end" style="min-width: 150px">
                        <button-icon icon="bi-pencil"                                        
                                     tooltip="update item attribute"
                                     text="Edit"
                                     :disabled="processing"
                                     classes="text-secondary"
                                     v-on:click-event="updateClick(attribute)">
                        </button-icon>

                        <button-icon icon="bi-trash"
                                     tooltip="delete attribute"
                                     text="Delete"
                                     :disabled="processing"
                                     classes="text-danger ms-3"
                                     v-on:click-event="deleteClick(attribute.itemAttributeID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
    </div>
    `
}