export default {
    props: ['show'],
    template: `
        <div v-if="show" class="placeholder-glow pt-2 pb-2 mb-1">
            <label class="form-label placeholder w-50 p-3"></label>
            <br />
            <span class="placeholder w-100 p-3"></span>
        </div>
    `
}