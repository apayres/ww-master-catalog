export class Category {
    categoryID;
    categoryName;
    categoryNameError;
    categoryDescription;
    categoryDescriptionError;
    subCategories = [];
    parentCategoryID;
    parentCategory = {};

    constructor(id, name, description, parent, subCategories) {
        this.categoryID = id;
        this.categoryName = name;
        this.categoryDescription = description;
        this.parentCategory = parent;
        this.subCategories = subCategories;

        if (parent) {
            this.parentCategoryID = parent.categoryID;
        }
    }

    validate() {
        this.clearErrors();

        let valid = true;
        const name = this.categoryName;
        if (!name) {
            this.categoryNameError = 'Category name is Required.';
            valid = false;
        }

        const description = this.categoryDescription;
        if (!description) {
            this.categoryDescriptionError = 'Category description is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.categoryNameError = null;
        this.categoryDescriptionError = null;
    }
}