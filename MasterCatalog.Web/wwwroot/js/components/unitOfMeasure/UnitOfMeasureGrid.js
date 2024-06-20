import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';
import { default as TablePlaceholder } from '../Shared/Placeholders/TablePlaceholder.js';
import { default as DialogConfirmation } from '../Shared/Dialogs/DialogConfirmation.js'

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

            dialog.show('Are you sure you want to delete this Unit of Measure?',
                // YES CALLBACK
                function () {
                    self.$emit('delete-item', id);
                },
                // NO CALLBACK
                function () {
                    return false;
                }
            );
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
                <tr v-for:="uom in items">
                    <td class="p-3">{{uom.unitOfMeasureName}}</td>
                    <td class="p-3">{{uom.unitOfMeasureDescription}}</td>
                    <td class="p-3 text-end" style="min-width: 150px">
                        <button-icon
                            icon="bi-pencil"
                            tooltip="update unit of measure"
                            text="Edit"
                            classes="text-secondary"
                            :disabled="processing"
                            v-on:click-event="updateClick(uom)">
                        </button-icon>

                        <button-icon
                            icon="bi-trash"
                            tooltip="delete unit of measure"
                            text="Delete"
                            :disabled="processing"
                            classes="text-danger ms-3"
                            v-on:click-event="deleteClick(uom.unitOfMeasureID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
    </div>
    `
}