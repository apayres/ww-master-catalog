export default {
    startWatch: false,

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

            this.$emit('update:value', Number(val));
        },
        value(val) {
            if (!this.startWatch) {
                return false;
            }

            this.inputValue = Number(val);
        }
    },
    mounted() {
        this.inputValue = this.value;
        this.startWatch = true;
    },
    template: `
        <div>
            <label v-if="label" class="form-label">{{ label }}</label>
            <div class="input-group" :title="tooltip">
                <span class="input-group-text">$</span>
                <input type="text" :class="cssClasses" v-model.lazy="inputValue" :disabled="disabled" />
            </div>
            <span class="text-danger" v-if="error">{{ error }}</span>
        </div>
    `
}