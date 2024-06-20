import { ApiUtility } from '../utilities/apiHelper.js';
import { UnitOfMeasure } from '../models/unitOfMeasure.js';

const _api = new ApiUtility('unitofmeasure');

export class UnitOfMeasureService {

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
        const uoms = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return uoms;
    }

    mapToModel(obj) {
        const uom = new UnitOfMeasure(
            obj.unitOfMeasureID,
            obj.unitOfMeasureName,
            obj.unitOfMeasureDescription
        );

        return uom;
    }
}