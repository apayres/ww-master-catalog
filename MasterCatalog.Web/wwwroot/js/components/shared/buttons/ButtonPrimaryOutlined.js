export default {
    props: ['text', 'icon', 'classes'],
    methods: {
        clickEvent() {
            this.$emit('click-event');
        }
    },
    computed: {
        iconClass() {
            return !this.icon ? '' : 'bi ' + this.icon + ' me-2';
        },
        cssClasses() {
            const additionalClasses = this.classes ? this.classes : '';
            return 'btn btn-outline-primary ' + additionalClasses;
        }
    },
    template: `
        <button type="button" v-on:click="clickEvent" :class="cssClasses">
            <i :class="iconClass" v:if="icon"></i>
            <span class="button-text">{{ text }}</span>
        </button>
    `
}