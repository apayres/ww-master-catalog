import { default as ButtonIcon } from '../../Shared/Components/Buttons/ButtonIcon.js';
import { default as TablePlaceholder } from '../../Shared/Components/Placeholders/TablePlaceholder.js';
import { default as DialogConfirmation } from '../../Shared/Components/Dialogs/DialogConfirmation.js'

export default {
    props: {
        companies: Array,
        processing: Boolean
    },
    components: {
        ButtonIcon,
        TablePlaceholder,
        DialogConfirmation
    },
    methods: {
        viewCatalog(company) {
            window.location.href = '/Company/Catalog' + '?companyId=' + company.companyID;
        },
        updateClick(company) {
            if (this.processing) {
                return false;
            }

            this.$emit('edit-item', company);
        },
        deleteClick(id) {
            if (this.processing) {
                return false;
            }

            const self = this;
            const dialog = this.$refs.confirmationDialog;

            dialog.show('Are you sure you want to delete this Company?',
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
                    <th class="p-3" colspan="2">Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for:="company in companies">
                    <td class="p-3">{{company.companyName}}</td>
                    <td class="p-3 text-end" style="min-width: 200px">
                        <button-icon
                            icon="bi-journal"
                            tooltip="Company catalog"
                            text="Catalog"
                            :disabled="processing"
                            classes="text-primary me-3"
                            v-on:click-event="viewCatalog(company)">
                        </button-icon>

                        <button-icon
                            icon="bi-pencil"
                            tooltip="update company"
                            text="Edit"
                            classes="text-secondary"
                            :disabled="processing"
                            v-on:click-event="updateClick(company)">
                        </button-icon>

                        <button-icon
                            icon="bi-trash"
                            tooltip="delete company"
                            text="Delete"
                            :disabled="processing"
                            classes="text-danger ms-3"
                            v-on:click-event="deleteClick(company.companyID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
    </div>
    `
}