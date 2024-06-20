import { ApiUtility } from '../utilities/apiHelper.js';
import { Company } from '../models/company.js';

const _api = new ApiUtility('company');

export class CompanyService {

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
        const companies = response.data.map((obj) => {
            return this.mapToModel(obj);
        });

        return companies;
    }

    async getById(id) {
        const response = await _api.get({ id });
        return this.mapToModel(response.data);
    }

    mapToModel(obj) {
        const company = new Company(
            obj.companyID,
            obj.companyName,
            obj.companyCode
        );

        return company;
    }
}