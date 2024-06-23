export default {
    props: {
        text: String,
        dismissible: Boolean
    },
    template: `
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <i class="bi bi-journal me-2"></i>
            <span>{{ text }}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" v-if="dismissible"></button>
        </div>
    `
}
