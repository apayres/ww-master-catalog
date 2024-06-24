export default {
    startWatch: false,

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

            if (!this.classes) {
                return defaultClasses;
            }

            return this.classes + defaultClasses;
        }
    },
    watch: {
        inputValue(val) {
            if (!this.startWatch) {
                return false;
            }

            this.$emit('update:value', val);
        },
        value(val) {
            if (!this.startWatch) {
                return false;
            }

            this.inputValue = val;
        }
    },
    mounted() {
        this.inputValue = this.value;
        this.startWatch = true;
    },
    template: `
        <div>
            <label v-if="label" class="form-label">{{ label }}</label>
            <textarea class="form-control" :class="cssClasses" v-model.lazy="inputValue" :title="tooltip" :disabled="disabled"  rows="3"></textarea>
            <span class="text-danger" v-if="error">{{ error }}</span>
        </div>
    `
}