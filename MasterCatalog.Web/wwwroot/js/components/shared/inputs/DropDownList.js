export default {
    data() {
        return {
            inputValue: ''
        }
    },
    props: {
        tooltip: String,
        value: Number,
        label: String,
        classes: String,
        disabled: Boolean,
        error: String,
        options: Array,
        textBinding: String,
        valueBinding: String
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
            <select class="form-select" v-model="inputValue" :disabled="disabled">
                <option v-for:="option in options" class="mt-2" :value="option[valueBinding]">
                    {{ option[textBinding] }}
                </option>
            </select>
            <span class="text-danger" v-if="error">{{ error }}</span>
        </div>
    `
}