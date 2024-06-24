import { createApp, toRaw } from 'vue';
import { UnitOfMeasureService } from '../../services/unitofmeasureService.js';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { UnitOfMeasure } from '../../models/unitOfMeasure.js';
import { default as UnitOfMeasureForm } from './UnitOfMeasureForm.js';
import { default as UnitOfMeasureGrid } from './UnitOfMeasureGrid.js';
import { ButtonPrimary } from '../shared/buttons/Index.js';
import { MessageCenter } from '../Shared/MessageCenter/Index.js';

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
        loadUnitsOfMeasure() {
            const self = this;
            self.processing = true;

            _service.get()
                .then(function (uoms) {
                    self.unitsOfMeasure = uoms;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem loading Units of Measure.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.processing = false;
                });
        },
        addUnitOfMeasure(uom) {
            const self = this;
            self.processing = true;
            
            _service.insert(toRaw(uom))
                .then(function (uom) {
                    self.unitsOfMeasure.push(uom);                    
                    self.messageCenter.success('Unit of measure added successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem inserting the Unit of Measure.");
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.resetForm();
                    self.processing = false;
                });
        },
        updateUnitOfMeasure(uom) {
            const self = this;
            self.processing = true;

            _service.update(toRaw(uom))
                .then(function (uom) {
                    const index = self.unitsOfMeasure.findIndex((x) => x.unitOfMeasureID == uom.unitOfMeasureID);
                    if (index > -1) {
                        self.unitsOfMeasure[index] = uom;
                    }

                    self.messageCenter.success('Unit of measure updated successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, "There was a problem updating the Unit of Measure.");
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
                    const msg = _errorHandler.getMessage(error, "There was a problem deleting the Unit of Measure.");
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
        this.messageCenter = this.$refs.messageCenter;
        this.loadUnitsOfMeasure();        
    }
}).mount('#content');