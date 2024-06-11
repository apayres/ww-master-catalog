import { Ingredient } from '../../models/ingredient.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { IngredientService } from '../../services/ingredientService.js';
import { ItemService } from '../../services/itemService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';

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
        MessageCenter
    },
    methods: {
        loadItems() {
            const self = this;
            if (self.ingredient.ingredientID) {
                self.items = [];
                return false;
            }

            _itemService.get()
                .then(function (response) {
                    self.items = response.data;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Could not load items');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        saveClick() {
            const self = this;
            
            const obj = new Ingredient(
                self.ingredient.ingredientID,
                self.ingredient.recipeItemID,
                self.ingredient.itemID,
                self.ingredient.ratio
            );

            if (!obj.validate()) {
                return false;
            }

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
            this.ingredient = { ...ingredient };
            this.saveCallback = callback;
            this.loadItems();
            this.dialog.show();
        },
        insertIngredient(obj) {
            const self = this;
            self.saving = true;

            _service.insert(obj)
                .then(function (response) {
                    obj.ingredientID = response.data.ingredientID;

                    self.saveCallback(obj);
                    self.dialog.hide();
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Problem inserting ingredient');
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
                .then(function (response) {                    
                    self.dialog.hide();
                    self.saveCallback(obj);
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Problem saving ingredient');
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
                            <label class="form-label">Item</label>

                            <input v-if="!items.length" type="text" class="form-control" disabled v-model="ingredient.item.itemName" />

                            <select v-if="items.length" class="form-select" v-model="ingredient.itemID">
                                <option>Select Item...</option>
                                <option v-for:="item in items" :value="item.itemID"> {{ item.itemName }}</option>
                            </select>
                        </div>
                        <span class="text-danger" v-if="ingredient.itemIDError">{{ ingredient.itemIDError }}</span>

                        <div class="col-3 mt-2">
                            <label class="form-label">Ratio</label>
                            <input type="text" class="form-control" v-model="ingredient.ratio" />
                        </div>
                        <span class="text-danger" v-if="ingredient.ratioError">{{ ingredient.ratioError }}</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" :disabled="saving" v-on:click="saveClick" class="btn btn-primary">Save</button>
                        <button type="button" :disabled="saving" v-on:click="cancelClick" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `
}