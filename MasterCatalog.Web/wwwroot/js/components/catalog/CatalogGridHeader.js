import { ButtonIcon } from '../shared/buttons/Index.js';
import { default as Anchor } from '../Shared/Links/Anchor.js';

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
        Anchor
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
                <div class="input-group mt-2">
                    <input v-on:keyup.enter="searchClick" type="text" class="form-control" placeholder="Search catalog..." v-model="searchTerm" />
                    <span class="input-group-text">
                        <button-icon
                            icon="bi-search"
                            :disabled="loading"
                            v-on:click-event="searchClick">
                        </button-icon>
                    </span>
                </div>
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