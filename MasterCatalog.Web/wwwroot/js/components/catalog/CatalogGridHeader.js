import { ButtonIcon } from '../shared/buttons/Index.js';
import { Anchor } from '../Shared/Links/Index.js';
import { SearchTextBox } from '../shared/inputs/Index.js';

export default {

    data() {
        return {
            searchTerm: '',
            searchClicked: false
        }
    },
    props: {
        loading: Boolean,
        providedSearchTerm: String
    },
    components: {
        ButtonIcon,
        Anchor,
        SearchTextBox
    },
    methods: {
        searchClick() {
            this.searchClicked = true;
            this.$emit('search-click', this.searchTerm);
        },
        clearSearchClick() {
            this.searchTerm = '';
            if (this.searchClicked) {
                this.searchClick();
            }
        },
        addClick() {
            this.$emit('add-click');
        }
    },
    mounted() {
        this.searchTerm = this.providedSearchTerm || '';
    },
    template: `
        <div class="row mb-3">
            <div class="col-4">                
                <search-text-box
                    placeholder="Search catalog..."
                    v-model:value="searchTerm"
                    :event="searchClick"
                    :disabled="loading">
                </search-text-box>
            </div>
            <div class="col-1">
                <anchor
                    v-if="searchTerm.length"
                    v-on:click-event="clearSearchClick"
                    text="Clear">
                </anchor>
            </div>
            <div class="col-7 text-end">
                <div class="mb-2 pe-1">
                    <button-icon
                        text="Add Item"
                        icon="bi-plus-lg"
                        :disabled="loading"
                        v-on:click-event="addClick">
                    </button-icon>
                </div>
            </div>
        </div>
    `
}