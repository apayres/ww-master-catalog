import { ApiUtility } from '../utilities/apiHelper.js';

const _url = window.ApiBaseUrl + 'ingredient';
const repo = new ApiUtility();

export class IngredientService {

    insert(obj) {
        return repo.insert(_url, obj);
    }

    update(obj) {
        return repo.update(_url, obj);
    }

    delete(id) {
        return repo.delete(_url, id);
    }
    
    getRecipe(id) {
        return repo.get(_url + '/recipe/' + id);
    }
}