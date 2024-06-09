export default {
    dialog: null,

    data() {
        return {
            text: ''
        }
    },
    methods: {
        show(prompt) {
            this.text = prompt;
            this.dialog.show();
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('alertDialog'), {
            backdrop: true,
            keyboard: true
        });
    },
    template: `
        <div class="modal fade" id="alertDialog" tabindex="-1" aria-labelledby="alertDialogLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="alertDialogLabel">Alert</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    {{ text }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `
}
