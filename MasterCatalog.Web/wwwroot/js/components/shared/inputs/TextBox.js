export default {
    data() {
        return {
            inputValue: ''
        }
    },
    props: {
        tooltip: String,
        value: String,
        label: String,
        classes: String,
        disabled: Boolean,
        error: String
    },
    computed: {
        isDisabled() {
            return this.disabled;
        },
        cssClasses() {
            let defaultClasses = ' form-control';           
            return this.classes + defaultClasses;
        }
    },
    watch: {
        inputValue(val) {
            this.$emit('update:value', val);
        },
        value(val) {
            this.inputValue = val;
        }
    },
    template: `
        <div>
            <label class="form-label">{{ label }}</label>
            <input type="text" :class="cssClasses" v-model.lazy="inputValue" :title="tooltip" :disabled="disabled" />
            <span class="text-danger" v-if="error">{{ error }}</span>
        </div>
    `
}