export default {
    props: {
        processing: Boolean,
        success: Boolean,
        failed: Boolean
    },
    computed: {
        showSuccessIndicator() {
            return !this.processing && this.success;
        },
        showFailureIndicator() {
            return !this.processing && this.failed;
        }
    },
    template: `
        <span>
            <div v-if:="processing" class="spinner-border spinner-border-sm text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> 
            <i v-if:="showSuccessIndicator" class="bi bi-check-lg text-success"></i>
            <i v-if:="showFailureIndicator" class="bi bi-exclamation-circle-fill text-danger"></i>
        </span>
    `
}
