import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';
import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';

export default {
    dialog: null,
    okayCallback: null,

    data() {
        return {
            orderedAttributes: []
        }
    },
    props: {
        attributes: Array
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon
    },
    methods: {
        moveUp(attribute) {
            const index = this.orderedAttributes.findIndex((obj) => obj.itemAttributeID === attribute.itemAttributeID);
            if (index === 0) {
                return false;
            }

            this.orderedAttributes.splice(index, 1);
            this.orderedAttributes.splice(index - 1, 0, attribute);
        },
        moveDown(attribute) {
            const index = this.orderedAttributes.findIndex((obj) => obj.itemAttributeID === attribute.itemAttributeID);
            if (index === this.orderedAttributes.length - 1) {
                return false;
            }

            this.orderedAttributes.splice(index, 1);
            this.orderedAttributes.splice(index + 1, 0, attribute);
        },
        okayClick() {
            const self = this;

            for (let i = 0; i < self.orderedAttributes.length; i++) {
                const attrValue = self.orderedAttributes[i].attributeValue;
                attrValue.displayOrder = i;
            }
            
            self.okayCallback(self.orderedAttributes);
            self.dialog.hide();
        },
        cancelClick() {
            this.dialog.hide();
        },
        show(callback) {
            this.orderedAttributes = [...this.attributes];
            this.dialog.show();
            this.okayCallback = callback;
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('itemAttributeOrderer'), {
            backdrop: 'static',
            keyboard: false
        });
    },
    template: `
        <div class="modal fade" id="itemAttributeOrderer" tabindex="-1" aria-labelledby="itemAttributeOrdererLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="itemAttributeOrdererLabel">Attributes Display Order</h1>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            <li class="list-group-item" v-for:="attribute in orderedAttributes">
                            <div class="row">
                                    <div class="col-8">
                                        {{ attribute.attributeName }}
                                    </div>
                                    <div class="col-4 text-end">
                                        <button-icon
                                            icon="bi-chevron-down"
                                            tooltip="Move down"
                                            v-on:click-event="moveDown(attribute)">
                                        </button-icon>

                                        <button-icon
                                            icon="bi-chevron-up"
                                            tooltip="Move up"
                                            classes="ms-2"
                                            v-on:click-event="moveUp(attribute)">
                                        </button-icon>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="okayClick" class="btn btn-primary">Save</button>
                        <button type="button" v-on:click="cancelClick" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `
}