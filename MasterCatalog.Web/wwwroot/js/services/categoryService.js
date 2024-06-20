import { ApiUtility } from '../utilities/apiHelper.js';
import { Category } from '../models/category.js';

const _api = new ApiUtility('category');

export class CategoryService {

    async insert(obj) {
        const response = await _api.insert(obj);
        return this.mapToModel(response.data);
    }

    async update(obj) {
        const response = await _api.update(obj);
        return this.mapToModel(response.data);
    }

    async delete(id) {
        return _api.delete(id);
    }

    async get() {
        const response = await _api.get();
        const categories = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return categories;
    }

    async getFormattedCategoryList(rootCategories) {
        let categories = rootCategories;
        if (!categories) {
            categories = await this.get();
        }

        let formattedCategories = [];
        categories.forEach((obj) => {
            formattedCategories.push(obj);

            if (obj.subCategories) {
                obj.subCategories.forEach((sub) => {
                    formattedCategories.push(sub);
                });
            }
        });

        return formattedCategories;
    }

    mapToModel(obj) {
        const category = new Category(
            obj.categoryID,
            obj.categoryName,
            obj.categoryDescription
        );

        if (obj.parentCategory) {
            category.parentCategory = new Category(
                obj.parentCategory.categoryID,
                obj.parentCategory.categoryName,
                obj.parentCategory.categoryDescription
            );

            category.categoryDisplayName = category.parentCategory.categoryName + ' > ' + category.categoryName;
        }
        else {
            category.categoryDisplayName = category.categoryName;
        }

        if (obj.subCategories) {
            category.subCategories = obj.subCategories.map((sub) => {
                const subCategory = new Category(
                    sub.categoryID,
                    sub.categoryName,
                    sub.categoryDescription,
                    category, []
                );

                subCategory.categoryDisplayName = category.categoryName + ' > ' + subCategory.categoryName
                return subCategory;
            });
        }

        return category;
    }
}