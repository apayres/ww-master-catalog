import { Ingredient } from '../../models/ingredient.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { IngredientService } from '../../services/ingredientService.js';
import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { ButtonPrimary, ButtonPrimaryOutlined } from '../shared/buttons/Index.js';
import { DropDownList, NumericTextBox } from '../shared/inputs/Index.js';

const _service = new IngredientService();
const _itemService = new ItemService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,
    dialog: null,
    saveCallback: null,

    data() {
        return {
            ingredient: new Ingredient(),
            saving: false,
            items: []
        }
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        MessageCenter,
        DropDownList,
        NumericTextBox
    },
    methods: {
        loadItems() {
            const self = this;
            if (self.ingredient.ingredientID) {
                self.items = [{
                    itemName: self.ingredient.item.itemName,
                    itemID: self.ingredient.item.itemID
                }];

                return false;
            }

            _itemService.get()
                .then(function (items) {
                    self.items = items;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'There was a problem loading the items');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        saveClick() {
            const self = this;
            
            if (!self.ingredient.validate()) {
                return false;
            }

            const obj = new Ingredient(
                self.ingredient.ingredientID,
                self.ingredient.recipeItemID,
                self.ingredient.itemID,
                self.ingredient.ratio
            );

            obj.item = null;
            if (obj.ingredientID) {
                self.updateIngredient(obj);
            }
            else {
                self.insertIngredient(obj);
            }
        },
        cancelClick() {
            this.dialog.hide();
        },
        show(ingredient, callback) {

            this.ingredient = new Ingredient(
                ingredient.ingredientID,
                ingredient.recipeItemID,
                ingredient.itemID,
                ingredient.ratio
            );

            this.ingredient.item = ingredient.item;

            this.saveCallback = callback;
            this.loadItems();
            this.dialog.show();
        },
        insertIngredient(obj) {
            const self = this;
            self.saving = true;

            _service.insert(obj)
                .then(function (ingredient) {
                    obj.ingredientID = ingredient.ingredientID;

                    self.saveCallback(obj);
                    self.dialog.hide();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'There was a problem inserting ingredient');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.saving = false;
                });
        },
        updateIngredient(obj) {
            const self = this;
            self.saving = true;

            _service.update(obj)
                .then(function (ingredient) {                    
                    self.dialog.hide();
                    self.saveCallback(obj);
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'There was a problem saving ingredient');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.saving = false;
                });
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('ingredientForm'), {
            backdrop: 'static',
            keyboard: false
        });

        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="modal fade" id="ingredientForm" tabindex="-1" aria-labelledby="ingredientFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="ingredientFormLabel">Ingredient</h1>
                    </div>
                    <div class="modal-body">
                        <message-center ref="messageCenter"></message-center>

                        <div class="col-6">
                            <drop-down-list
                                label="Item"
                                text-binding="itemName"
                                value-binding="itemID"
                                tooltip="Item"
                                :options="items"
                                :disabled="items.length < 2"
                                :error="ingredient.itemIDError"
                                v-model:value="ingredient.itemID"
                            </drop-down-list>
                        </div>

                        <div class="col-3 mt-2">
                            <numeric-text-box
                                label="Ratio"
                                tooltip="Unit Ratio"
                                v-model:value="ingredient.ratio"
                                :error="ingredient.ratioError"
                                :disabled="saving">
                            </numeric-text-box>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button-primary
                            text="Save"
                            icon="bi-floppy-fill"
                            classes="me-2"
                            v-on:click-event="saveClick">
                        </button-primary>

                        <button-primary-outlined
                            text="Cancel"
                            icon="bi-ban"
                            v-on:click="cancelClick">
                        </button-primary-outlined>
                    </div>
                </div>
            </div>
        </div>
    `
}