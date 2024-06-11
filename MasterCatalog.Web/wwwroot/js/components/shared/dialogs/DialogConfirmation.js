export default {
    dialog: null,
    confirmCallback: null,
    denyCallback: null,

    data() {
        return {
            text: ''
        }
    },
    methods: {
        confirmClick() {
            this.confirmCallback();
            this.dialog.hide();
        },
        denyClick() {
            this.denyCallback();
            this.dialog.hide();
        },
        show(prompt, confirmCallback, denyCallback) {          
            this.text = prompt;
            this.confirmCallback = confirmCallback;
            this.denyCallback = denyCallback;
            this.dialog.show();
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('staticConfirmationDialog'), {
            backdrop: 'static',
            keyboard: false
        });
    },
    template: `
        <div class="modal fade" id="staticConfirmationDialog" tabindex="-1" aria-labelledby="staticConfirmationDialogLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticConfirmationDialogLabel">Please Confirm</h1>
                    </div>
                    <div class="modal-body">
                    {{ text }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="confirmClick" class="btn btn-primary">Yes</button>
                        <button type="button" v-on:click="denyClick" class="btn btn-secondary">No</button>
                    </div>
                </div>
            </div>
        </div>
    `
}
