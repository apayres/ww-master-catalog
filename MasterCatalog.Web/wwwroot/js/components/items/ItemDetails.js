import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';
import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { default as CompanySelector } from './CompanySelectorjs.js';
import { default as DialogConfirmation } from '../Shared/Dialogs/DialogConfirmation.js'

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
        DialogConfirmation
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
                    const msg = _errorHandler.getMessage(error, "Could not add item.");
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
                    const msg = _errorHandler.getMessage(error, "Could not update item.");
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
            window.location.href = '/Items/List';
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
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" v-model="item.itemName" />
                        <span class="text-danger" v-if="item.itemNameError">{{item.itemNameError}}</span>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Upc</label>
                        <input type="text" class="form-control" v-model="item.upc" />
                        <span class="text-danger" v-if="item.upcError">{{item.upcError}}</span>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-12">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" v-model="item.itemDescription" rows="3"></textarea>
                        <span class="text-danger" v-if="item.itemDescriptionError">{{item.itemDescriptionError}}</span>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-5">
                        <label class="form-label">Category</label>
                        <select class="form-select" v-model="item.categoryID" :disabled="categories.length === 0">
                            <option>Select Category...</option>
                            <option v-for:="category in categories" :value="category.categoryID" :title="category.categoryDescription"> {{ getFormattedCategoryName(category) }}</option>
                        </select>
                        <span class="text-danger" v-if="item.categoryIDError">{{item.categoryIDError}}</span>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Unit of Measure</label>
                        <select class="form-select" v-model="item.unitOfMeasureID" :disabled="unitsOfMeasure.length === 0">
                            <option>Select Unit of Measure...</option>
                            <option v-for:="uom in unitsOfMeasure" :value="uom.unitOfMeasureID" :title="uom.unitOfMeasureDescription"> {{ uom.unitOfMeasureName }}</option>
                        </select>
                        <span class="text-danger" v-if="item.unitOfMeasureIDError">{{item.unitOfMeasureIDError}}</span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Quantity</label>
                        <input type="text" class="form-control" v-model="item.unitQuantity" />
                        <span class="text-danger" v-if="item.unitQuantityError">{{item.unitQuantityError}}</span>
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