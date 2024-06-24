export class Ingredient {
    ingredientID;
    recipeItemID;
    recipeItemIDError;
    itemID;
    itemIDError
    ratio;
    ratioError;
    item;

    constructor(ingredientID, recipeItemID, itemID, ratio) {
        this.ingredientID = ingredientID;
        this.recipeItemID = recipeItemID;
        this.itemID = itemID;
        this.ratio = ratio;
        this.item = { };
    }

    validate() {
        this.clearErrors();

        let valid = true;
        if (!this.recipeItemID) {
            this.recipeItemIDError = 'Repcipe item is Required.';
            valid = false;
        }

        if (!this.itemID) {
            this.itemIDError = 'Ingredient item is Required.';
            valid = false;
        }

        if (!this.ratio) {
            this.ratioError = 'Ratio > 0 is Required.';
            valid = false;
        }

        return valid;
    }

    clearErrors() {
        this.recipeItemIDError = null;
        this.itemIDError = null;
        this.ratioError = null;
    }
}