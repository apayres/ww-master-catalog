export default {
    props: ['text', 'icon', 'tooltip'],
    methods: {
        clickEvent() {
            this.$emit('click-event');
        }
    },
    computed: {
        iconClass() {
            return !this.icon ? '' : 'bi ' + this.icon + ' me-2';
        }
    },
    template: `
        <a href="#" v-on:click.prevent="clickEvent" class="text-secondary align-middle link-opacity-75-hover link-underline link-underline-opacity-0">
            <i :class="iconClass" v:if="icon"></i>
            <span class="anchor-text">{{ text }}</span>
        </a>
    `
}