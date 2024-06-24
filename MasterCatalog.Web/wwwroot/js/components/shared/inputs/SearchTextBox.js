import { ButtonIcon } from '../buttons/Index.js';

export default {
    startWatch: false,

    data() {
        return {
            inputValue: ''
        }
    },
    props: {
        placeholder: String,
        value: String,
        event: Function,
        disabled: Boolean
    },
    components: {
        ButtonIcon
    },
    computed: {
        isDisabled() {
            return this.disabled;
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
        <div class="input-group">
            <input v-on:keyup.enter="event" type="text" class="form-control" :placeholder="placeholder" v-model.lazy="inputValue" :disabled="isDisabled" />
            <span class="input-group-text">
                <button-icon
                    icon="bi-search"
                    :disabled="isDisabled"
                    v-on:click-event="event">
                </button-icon>
            </span>
        </div>
    `
}