import { createApp, toRaw } from 'vue';
import { CategoryService } from '../../services/categoryService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { Category } from '../../models/category.js';
import { ButtonPrimary } from '../shared/buttons/Index.js';
import { MessageCenter } from '../shared/messageCenter/Index.js';
import { default as CategoryForm } from './CategoryForm.js';
import { default as CategoryGrid } from './CategoryGrid.js';

const _service = new CategoryService();
const _errorHandler = new ErrorHandler();

createApp({
    messageCenter: null,

    data() {
        return {
            form: {
                model: new Category()
            },
            categories: [],
            processing: true
        }
    },
    components: {
        CategoryForm,
        CategoryGrid,
        ButtonPrimary,
        MessageCenter
    },
    methods: {
        loadCategories() {
            const self = this;

            _service.getFormattedCategoryList()
                .then(function (categories) {
                    self.categories = categories;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem loading the categories.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        addCategory(category) {
            const self = this;
            self.processing = true;

            _service.insert(toRaw(category))
                .then(function (response) {
                    self.loadCategories();
                    self.messageCenter.success('Category added successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem inserting the category.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.form.model = new Category()
                    self.processing = false;
                });
        },
        updateCategory(category) {
            const self = this;
            self.processing = true;

            _service.update(toRaw(category))
                .then(function (response) {
                    self.loadCategories();
                    self.messageCenter.success('Category updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem updating the category.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.resetForm();
                    self.processing = false;
                });
        },
        deleteCategory(id) {
            const self = this;
            self.processing = true;

            _service.delete(id)
                .then(function (response) {
                    const index = self.categories.findIndex((x) => x.categoryID == id);
                    if (index > -1) {
                        self.categories.splice(index, 1);
                    }

                    self.messageCenter.success('Category deleted successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem deleting the category.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        loadForm(category) {
            this.form.model = new Category(
                category.categoryID,
                category.categoryName,
                category.categoryDescription,
                category.parentCategory
            );
        },
        resetForm() {
            this.form.model = new Category()
        }
    },
    mounted() {
        this.messageCenter = this.$refs.messageCenter;        
        this.loadCategories();
    }
}).mount('#content');