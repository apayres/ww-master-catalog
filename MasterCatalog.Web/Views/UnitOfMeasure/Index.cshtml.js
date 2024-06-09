import { createApp, toRaw } from 'vue';
import { UnitOfMeasureService } from '/js/services/unitofmeasure-service.js';
import { ErrorHandler } from '/js/utilities/errorHandler.js';
import { UnitOfMeasure } from '/js/models/unitOfMeasure.js';
import { default as UnitOfMeasureForm } from './Components/UnitOfMeasureForm.js';
import { default as UnitOfMeasureGrid } from './Components/UnitOfMeasureGrid.js';
import { default as ButtonPrimary } from '../Shared/Components/Buttons/ButtonPrimary.js';
import { default as MessageCenter } from '../Shared/Components/MessageCenter/MessageCenter.js';

const _service = new UnitOfMeasureService();
const _errorHandler = new ErrorHandler();

createApp({
    messageCenter: null,

    data() {
        return {
            form: {
                model: new UnitOfMeasure()
            },
            unitsOfMeasure: [],
            processing: true
        }
    },
    components: {
        UnitOfMeasureForm,
        UnitOfMeasureGrid,
        ButtonPrimary,
        MessageCenter
    },
    methods: {
        addUnitOfMeasure(uom) {
            const self = this;
            self.processing = true;
            
            _service.insert(toRaw(uom))
                .then(function (response) {
                    self.unitsOfMeasure.push(response.data);                    
                    self.messageCenter.success('Unit of measure added successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.form.model = new UnitOfMeasure()
                    self.processing = false;
                });
        },
        updateUnitOfMeasure(uom) {
            const self = this;
            self.processing = true;

            _service.update(toRaw(uom))
                .then(function (response) {
                    const updatedUom = response.data;
                    const index = self.unitsOfMeasure.findIndex((x) => x.unitOfMeasureID == updatedUom.unitOfMeasureID);

                    if (index > -1) {
                        self.unitsOfMeasure[index] = updatedUom;
                    }

                    self.messageCenter.success('Unit of measure updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.resetForm();
                    self.processing = false;
                });
        },
        deleteUnitOfMeasure(id) {
            const self = this;
            self.processing = true;

            _service.delete(id)
                .then(function (response) {
                    const index = self.unitsOfMeasure.findIndex((x) => x.unitOfMeasureID == id);
                    if (index > -1) {
                        self.unitsOfMeasure.splice(index, 1);
                    }

                    self.messageCenter.success('Unit of measure deleted successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error);
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        loadForm(uom) {
            this.form.model = new UnitOfMeasure(
                uom.unitOfMeasureID,
                uom.unitOfMeasureName,
                uom.unitOfMeasureDescription
            );
        },
        resetForm() {
            this.form.model = new UnitOfMeasure()
        }
    },
    mounted() {
        const self = this;
        self.messageCenter = this.$refs.messageCenter;

        _service.get()
            .then(function (response) {
                self.unitsOfMeasure = response.data;
            })
            .catch(function (error) {
                const msg = _errorHandler.getMessage(error);
                self.messageCenter.error(msg);
            })
            .finally(function () {
                self.processing = false;
            });
    }
}).mount('#content');