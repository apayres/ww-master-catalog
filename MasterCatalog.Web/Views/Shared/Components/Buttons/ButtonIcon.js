export default {
    props: ['tooltip', 'icon', 'classes', 'disabled', 'text'],
    methods: {
        clickEvent() {
            this.$emit('click-event');
        }
    },
    computed: {
        iconClass() {
            return 'bi ' + this.icon;
        },
        isDisabled() {
            return this.disabled;
        },
        showText() {
            return this.text && this.text.length;
        },
        CssClasses() {
            let generatedClasses = '';
            if (this.text && this.text.length) {
                generatedClasses = ' link-underline-opacity-0 link-underline';
            }

            return this.classes + generatedClasses;
        }
    },
    template: `
        <a href="#" v-on:click.prevent="clickEvent"
                    :title="tooltip"
                    :class="CssClasses"
                    :disabled="isDisabled">
            <i :class="iconClass"></i><span v-if:="showText" class="ms-2">{{ text }}</span>
        </a>
    `
}