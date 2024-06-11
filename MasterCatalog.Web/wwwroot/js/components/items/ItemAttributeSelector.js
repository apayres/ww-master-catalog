import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';
import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';

export default {
    dialog: null,
    okayCallback: null,

    data() {
        return {
            selectorAttributes: []
        }
    },
    props: {
        allAttributes: Array
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon
    },
    methods: {        
        okayClick() {
            this.okayCallback(this.selectorAttributes.filter((obj) => {
                return obj.useWithItem;
            }));

            this.dialog.hide();
        },
        cancelClick() {
            this.dialog.hide();
        },
        show(callback) {
            this.mapSelectorAttributes();
            this.dialog.show();
            this.okayCallback = callback;
        },
        mapSelectorAttributes() {
            this.selectorAttributes = this.allAttributes.map((obj) => {
                return {...obj};
            });
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('itemAttributeSelector'), {
            backdrop: 'static',
            keyboard: false
        });
    },
    template: `
        <div class="modal fade" id="itemAttributeSelector" tabindex="-1" aria-labelledby="itemAttributeSelectorLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="itemAttributeSelectorLabel">Attributes</h1>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            <li class="list-group-item" v-for:="attribute in selectorAttributes">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" v-model="attribute.useWithItem">
                                    {{ attribute.attributeName }}
                                </label>
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