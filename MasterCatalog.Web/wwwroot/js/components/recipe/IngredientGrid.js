import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { default as TablePlaceholder } from '../Shared/Placeholders/TablePlaceholder.js';
import { default as DialogConfirmation } from '../Shared/Dialogs/DialogConfirmation.js'
import { default as IngredientForm } from './IngredientForm.js';

import { Ingredient } from '../../models/ingredient.js';
import { IngredientService } from '../../services/ingredientService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';

const _ingredientService = new IngredientService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,
    ingredientForm: null,

    data() {
        return {
            loading: true,
            ingredients: [],
            saving: false
        }
    },
    props: {
        item : Object
    },
    components: {
        TablePlaceholder,
        ButtonIcon,
        MessageCenter,
        DialogConfirmation,
        IngredientForm
    },
    methods: {
        
        loadIngredients() {
            const self = this;
            if (!self.item || !self.item.itemID) {
                return false;
            }

            _ingredientService.getRecipe(self.item.itemID)
                .then(function (ingredients) {
                    self.ingredients = ingredients;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Could not load ingredients');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        backClick() {
            window.location.href = "/items/index/" + this.item.itemID;
            return false;
        },
        addClick() {
            const self = this;
            const ingredient = new Ingredient(null, self.item.itemID, null, null);

            self.ingredientForm.show(ingredient, function (newIngredient) {
                self.messageCenter.success('Ingredient inserted successfully!');
                self.loadIngredients();
            });
        },
        updateClick(ingredient) {
            const self = this;

            self.ingredientForm.show(ingredient, function (updatedIngredient) {
                self.messageCenter.success('Ingredient saved successfully!');
                const index = self.ingredients.findIndex((x) => x.ingredientID === updatedIngredient.ingredientID);
                if (index >= 0) {
                    self.ingredients[index].ratio = updatedIngredient.ratio;
                }
            });
        },
        deleteClick(id) {
            const self = this;
            const dialog = self.$refs.confirmationDialog;

            dialog.show('Are you sure you want to delete this Ingredient?',
                // YES CALLBACK
                function () {
                    self.saving = true;

                    _ingredientService.delete(id)
                        .then(function (response) {
                            self.messageCenter.success('Ingredient deleted successfully!');

                            const index = self.ingredients.findIndex((x) => x.ingredientID === id);
                            if (index >= 0) {
                                self.ingredients.splice(index, 1);
                            }
                        })
                        .catch(function (error) {
                            const msg = _errorHandler.getMessage(error, 'Problem deleting ingredient');
                            self.messageCenter.error(msg);
                        })
                        .finally(function () {
                            self.saving = false;
                        });
                },
                // NO CALLBACK
                function () {
                    return false;
                }
            );
        },
        backClick(id) {
            window.location.href = '/Items/Index/' + this.item.itemID;
            return false;
        }
    },
    watch: {
        'item.itemID'(val, oldVal) {
            if (val) {
                this.loadIngredients();
            }
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;
        this.ingredientForm = this.$refs.ingredientForm;
    },
    template: `
    <div>
        <div class="row mt-1 mb-3">
            <div class="col-8">
                <h4 v-text="item.itemName"></h4>
            </div>
            <div class="col-4">
                <div class="mb-2 pe-1 text-end">
                    <button-icon
                        text="Return to Item"
                        icon="bi-arrow-bar-left"
                        :disabled="saving"
                        classes="me-3"
                        v-on:click-event="backClick">
                    </button-icon>

                    <button-icon
                        text="Add Ingredient"
                        icon="bi-plus-lg"
                        :disabled="saving"
                        v-on:click-event="addClick">
                    </button-icon>
                </div>
            </div>
        </div>

        <message-center ref="messageCenter"></message-center>

        <table-placeholder
            :show="loading"
            rows="5"
            columns="4">
        </table-placeholder>

        <table class="table" v-if="!loading">
            <thead>
                <tr>
                    <th class="p-3">Upc</th>
                    <th class="p-3">Name</th>
                    <th class="p-3">Description</th>
                    <th class="p-3">Unit of Measure</th>
                    <th class="p-3">Ratio</th>
                    <th class="p-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for:="ingredient in ingredients">
                    <td class="p-3">{{ingredient.item.upc}}</td>
                    <td class="p-3">{{ingredient.item.itemName}}</td>
                    <td class="p-3">{{ingredient.item.itemDescription}}</td>
                    <td class="p-3">{{ingredient.item.unitOfMeasure && ingredient.item.unitOfMeasure.unitOfMeasureName}} ({{ ingredient.item.unitQuantity }})</td>
                    <td class="p-3">{{ingredient.ratio}}</td>
                    <td class="p-3 text-end">
                        <button-icon
                            icon="bi-pencil"
                            tooltip="update ingredient"
                            text="Edit"
                            classes="text-secondary"
                            :disabled="loading"
                            v-on:click-event="updateClick(ingredient)">
                        </button-icon>

                        <button-icon
                            icon="bi-trash"
                            tooltip="delete ingredient"
                            text="Delete"
                            :disabled="loading"
                            classes="text-danger ms-3"
                            v-on:click-event="deleteClick(ingredient.ingredientID)">
                        </button-icon>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
        <ingredient-form ref="ingredientForm"></ingredient-form>
    </div>
    `
}