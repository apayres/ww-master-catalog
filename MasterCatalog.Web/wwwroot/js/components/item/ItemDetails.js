import { ButtonPrimary, ButtonPrimaryOutlined, ButtonIcon } from '../shared/buttons/Index.js';
import { TextBox, NumericTextBox, TextArea, DropDownList } from '../shared/inputs/Index.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';
import { default as CompanySelector } from '../company/CompanySelector.js';
import { DialogConfirmation } from '../Shared/Dialogs/Index.js'
import { ItemService } from '../../services/itemService.js';
import { CategoryService } from '../../services/categoryService.js';
import { UnitOfMeasureService } from '../../services/unitofmeasureService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { Item } from '../../models/item.js';

const _itemService = new ItemService();
const _categoryService = new CategoryService();
const _uomService = new UnitOfMeasureService();
const _errorHandler = new ErrorHandler();

export default {
    messageCenter: null,

    data() {
        return {
            unitsOfMeasure: [],
            categories: [],
            saving: false
        }
    },
    props: {
        loading: Boolean,
        item: new Item()
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon,
        MessageCenter,
        CompanySelector,
        DialogConfirmation,
        TextBox,
        DropDownList,
        NumericTextBox,
        TextArea
    },
    methods: {
        loadUnitsOfMeasure() {
            const self = this;

            _uomService.get()
                .then(function (uoms) {
                    self.unitsOfMeasure = uoms;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "Could not load Units of Measure.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                });
        },
        loadCategories() {
            const self = this;

            _categoryService.getFormattedCategoryList()
                .then(function (categories) {
                    self.categories = categories;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "Could not load categories.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                });
        },
        addClick() {
            if (!this.item.validate()) {
                return false;
            }

            const self = this;
            self.saving = true;

            _itemService.insert(self.item)
                .then(function (item) {
                    self.item.itemID = item.itemID;
                    self.messageCenter.success('Item added successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem inserting the item.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.saving = false;
                });

        },
        updateClick() {
            if (!this.item.validate()) {
                return false;
            }

            const self = this;
            self.saving = true;

            _itemService.update(self.item)
                .then(function (response) {
                    self.messageCenter.success('Item updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem updating the item.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.saving = false;
                });
        },
        deleteClick() {
            const self = this;
            if (self.saving) {
                return false;
            }

            const dialog = this.$refs.confirmationDialog;
            dialog.show('Are you sure you want to delete this Item?',

                // YES CALLBACK
                function () {
                    self.saving = true;

                    _itemService.delete(self.item.itemID)
                        .then(function (response) {
                            self.messageCenter.success('Item deleted successfully! Use the left menu to return to the item list.');
                            self.item.itemID = null;
                        })
                        .catch(function (error) {
                            const msg = _errorHandler.getMessage(error);
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
        cancelClick() {
            window.location.href = '/Items/Index';
        },
        showCompanySelector() {
            const self = this;

            const companySelector = self.$refs.companySelector;
            companySelector.show(function () {
                self.messageCenter.success('Item added to company catalog successfully!');
            });
        },
        getFormattedCategoryName(category) {
            return category.parentCategory ? category.parentCategory.categoryName + ' > ' + category.categoryName : category.categoryName;
        }
    },
    computed: {
        formattedCategoryList() {
            return this.categories.map((obj) => {
                return {
                    categoryName: this.getFormattedCategoryName(obj),
                    categoryID: obj.categoryID
                };
            });
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;
        this.loadUnitsOfMeasure();
        this.loadCategories();
    },
    template: `
    <div id="itemDetails">
        <div v-if="loading" class="placeholder-glow">
            <div class="p-3">
                <div class="row mb-2">
                    <div class="col-8">
                        <span class="mb-3 placeholder w-50 p-3"></span>
                    </div>                    
                </div>

                <div class="row mb-2">
                    <div class="col-5">
                        <label class="form-label">Name</label>
                        <span class="placeholder w-100 p-3"></span>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Upc</label>
                        <span class="placeholder w-100 p-3"></span>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-12">
                        <label class="form-label">Description</label>
                        <span class="placeholder w-100 p-3"></span>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-3">
                        <label class="form-label">Unit of Measure</label>
                        <span class="placeholder w-100 p-3"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Quantity</label>
                        <span class="placeholder w-100 p-3"></span>
                    </div>
                </div>

                <div class="mt-4">
                    <button-primary
                        text="Save"
                        icon="bi-floppy-fill"
                        :disabled="true"
                        classes="placeholder">
                    </button-primary>

                    <span class="me-2"></span>

                    <button-primary-outlined
                        text="Delete"
                        icon="bi-trash"
                        :disabled="true"
                        classes="placeholder">
                    </button-primary-outlined>

                    <span class="me-2"></span>

                    <button-primary-outlined
                        text="Cancel"
                        icon="bi-ban"
                        :disabled="true"
                        classes="placeholder">
                    </button-primary-outlined>
                </div>
            </div>
        </div>

        <div>
            <message-center ref="messageCenter"></message-center>

            <div class="p-3" v-if="!loading">
                <div class="row mb-2">
                    <div class="col-8">
                        <h4 class="mb-3">{{ item.itemID ? 'Item Details' : 'New Item' }}</h4>
                    </div>
                    <div class="col-4 text-end">
                        <div v-if="item.itemID" class="pe-1">
                            <button-icon
                                text="Add to Company Catalog"
                                icon="bi-plus-lg"
                                :disabled="loading"
                                v-on:click-event="showCompanySelector">
                            </button-icon>
                        </div>
                    </div>
                </div>
            
                <div class="row mb-2">
                    <div class="col-5">
                        <text-box
                            label="Name"
                            tooltip="Item Name"
                            v-model:value="item.itemName"
                            :error="item.itemNameError"
                            :disabled="loading">
                        </text-box>
                    </div>
                    <div class="col-3">
                        <text-box
                            label="Upc"
                            tooltip="Item Upc"
                            v-model:value="item.upc"
                            :error="item.upcError"
                            :disabled="loading">
                        </text-box>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-12">
                         <text-area
                            label="Description"
                            tooltip="Item Description"
                            v-model:value="item.itemDescription"
                            :error="item.itemDescriptionError"
                            :disabled="loading">
                        </text-area>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-5">                        
                        <drop-down-list
                            label="Category"
                            text-binding="categoryName"
                            value-binding="categoryID"
                            tooltip="Item Category"
                            :options="formattedCategoryList"
                            :disabled="loading || categories.length === 0"
                            :error="item.categoryIDError"
                            v-model:value="item.categoryID"
                        </drop-down-list>
                    </div>
                    <div class="col-3">                        
                        <drop-down-list
                            label="Unit of Measure"
                            text-binding="unitOfMeasureName"
                            value-binding="unitOfMeasureID"
                            tooltip="Unit of Measure"
                            :options="unitsOfMeasure"
                            :disabled="loading || unitsOfMeasure.length === 0"
                            :error="item.unitOfMeasureIDError"
                            v-model:value="item.unitOfMeasureID"
                        </drop-down-list>
                    </div>
                    <div class="col-2">
                        <numeric-text-box
                            label="Quantity"
                            tooltip="Unit Quantity"
                            v-model:value="item.unitQuantity"
                            :error="item.unitQuantityError"
                            :disabled="loading">
                        </numeric-text-box>
                    </div>
                </div>                               

                <div class="mt-4">
                    <button-primary
                        text="Add"
                        icon="bi-plus-circle"
                        classes="me-2"
                        :disabled="saving || loading"
                        v-if="!item.itemID"
                        v-on:click-event="addClick">
                    </button-primary>
                                    
                    <button-primary
                        text="Save"
                        icon="bi-floppy-fill"
                        classes="me-2"
                        :disabled="loading"
                        v-if="item.itemID"
                        v-on:click-event="updateClick">
                    </button-primary>

                    <button-primary-outlined
                        text="Delete"
                        icon="bi-trash"
                        classes="me-2"
                        :disabled="saving || loading"
                        v-on:click="deleteClick"
                        v-if="item.itemID">
                    </button-primary-outlined>

                    <button-primary-outlined
                        text="Cancel"
                        icon="bi-ban"
                        :disabled="saving || loading"
                        v-on:click="cancelClick">
                    </button-primary-outlined>
                </div>
            </div>

            <company-selector
                v-if="item && item.itemID"
                :item-id="item.itemID"
                ref="companySelector">
            </company-selector>

            <dialog-confirmation ref="confirmationDialog"></dialog-confirmation>
        </div>
    </div>
    `
}