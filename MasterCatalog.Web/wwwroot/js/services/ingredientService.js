import { ApiUtility } from '../utilities/apiHelper.js';
import { Ingredient } from '../models/ingredient.js';
import { Item } from '../models/item.js';

const _api = new ApiUtility('ingredient');

export class IngredientService {

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
    
    async getRecipe(id) {
        const response = await _api.get(null, 'recipe/' + id);
        const recipe = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return recipe;
    }

    mapToModel(obj) {
        const ingredient = new Ingredient(
            obj.ingredientID,
            obj.recipeItemID,
            obj.itemID,
            obj.ratio
        );

        if (obj.item) {
            ingredient.item = new Item(
                obj.item.itemID,
                obj.item.itemName,
                obj.item.itemDescription,
                obj.item.unitQuantity
            );

            ingredient.item.upc = obj.item.upc;
        }

        return ingredient;
    }
}