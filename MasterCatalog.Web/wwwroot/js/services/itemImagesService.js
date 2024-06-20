import { ApiUtility } from '../utilities/apiHelper.js';
import { ItemImage } from '../models/itemImage.js';

const _api = new ApiUtility('itemimages');

export class ItemImagesService {

    async upload(obj) {
        const response = await _api.upload(obj);
        return this.mapToModel(response.data);
    }

    async update(obj) {
        const response = await _api.update(obj);
        return this.mapToModel(response.data);
    }

    async delete(id, upc) {
        return _api.delete(null, { id, upc });
    }

    async getItemImages(id) {
        const response = await _api.get(null, id);
        const images = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return images;
    }

    mapToModel(obj) {
        const image = new ItemImage(
            obj.itemImageID,
            obj.itemID,
            obj.absoluteUri,
            obj.displayOrder
        );

        return image;
    }
}