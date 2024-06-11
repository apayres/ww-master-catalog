import { IngredientService } from '../../services/ingredientService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';

const _service = new IngredientService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,

    data() {
        return {
            loading: true,
            itemID: 0,
            ingredients: []
        }
    },
    components: {
        ButtonIcon,
        MessageCenter
    },
    methods: {
        loadRecipe(itemID) {
            const self = this;
            self.ingredients = [];
            self.itemID = itemID;

            if (!itemID) {
                self.loading = false;
                return false;
            }

            _service.getRecipe(itemID)
                .then(function (response) {
                    self.ingredients = response.data;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Could not load ingredients');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        recipeClick() {
            window.location.href = '/Recipe/Index/' + this.itemID;
            return false;
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="p-3 mb-2">
            <div class="row mb-3">
                <div class="col-6">
                    <h4>Recipe</h4>
                </div>
                <div class="col-6 text-end">
                    <button-icon
                        text="Manage"
                        icon="bi-cup"
                        tooltip="Manage item recipe"
                        v-on:click-event="recipeClick"
                        v-if="!loading && itemID">
                    </button-icon>
                </div>
            </div>

            <message-center ref="messageCenter"></message-center>

            <div v-if="loading" class="placeholder-glow">
                <div class="placeholder p-3 w-60 mb-2"></div>
                <div class="placeholder p-3 w-60 mb-2"></div>
                <div class="placeholder p-3 w-60 mb-2"></div>
                <div class="placeholder p-3 w-60 mb-2"></div>
            </div>

            <div v-if="!loading && itemID && ingredients.length">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-for:="ingredient in ingredients">
                        {{ ingredient.item.itemName }} ({{ ingredient.item.upc }})
                        <span class="badge text-bg-primary rounded-pill">{{ ingredient.ratio }}</span>
                    </li>
                </ul>
            </div>

            <div v-if="!loading && !itemID">
                <div class="alert alert-light" role="alert">Recipe can be configured once item has been created</div>
            </div>

            <div v-if="!loading && itemID && !ingredients.length">
                <div class="alert alert-light" role="alert">Click the 'Manage' button above to configure item ingredients</div>
            </div>
        </div>
    `
}