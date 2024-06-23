import { ItemAttribute } from '../../models/ItemAttribute.js';
import { ItemAttributeValueService } from '../../services/itemAttributeValueService.js';
import { ItemAttributeValue } from '../../models/itemAttributeValue.js';
import { FieldSavingStatus as SavingStatus } from '../Shared/Placeholders/Index.js';

const _service = new ItemAttributeValueService();

export default {
    startWatching: false,

    data() {
        return {
            saving: false,
            success: false,
            failed: false,
            attribute: new ItemAttribute()
        }
    },
    props: {
        attributeRecord: Object,
        itemId: Number
    },
    components: {
        SavingStatus
    },
    methods: {
        saveAttributeValue(val) {
            const obj = new ItemAttributeValue(
                this.attribute.attributeValue.itemAttributeValueID,
                this.itemId,
                this.attribute.itemAttributeID,
                val,
                this.attribute.attributeValue.displayOrder
            );

            if (!obj.itemAttributeValueID) {
                this.insertAttributeValue(obj);
                return false;
            }

            this.updateAttributeValue(obj);
        },
        insertAttributeValue(obj) {
            const self = this;

            _service.insert(obj)
                .then(function (attributeValue) {
                    self.attributeValue = attributeValue;
                    self.success = true;
                    self.failed = false;
                })
                .catch(function (error) {
                    self.failed = true;
                    self.success = false;
                })
                .finally(function () {
                    self.clearSaveStatuses();
                });
        },
        updateAttributeValue(obj) {
            const self = this;

            _service.update(obj)
                .then(function (attributeValue) {
                    self.attributeValue = attributeValue;
                    self.success = true;
                    self.failed = false;
                })
                .catch(function (error) {
                    self.failed = true;
                    self.success = false;
                })
                .finally(function () {
                    self.clearSaveStatuses();
                });
        },
        clearSaveStatuses() {
            const self = this;
            self.saving = false;

            setTimeout(() => {
                self.success = false;
                self.failed = false;
            }, 1500)
        }
    },
    watch: {
        'attribute.attributeValue.attributeValue'(val, oldVal) {
            if (!this.startWatching || val == oldVal) {
                return false;
            }

            this.saving = true;
            this.saveAttributeValue(val);
        }
    },
    updated() {
        this.startWatching = true;
        this.attribute = this.attributeRecord;
    },
    mounted() {
        this.attribute = this.attributeRecord;
    },
    template: `
        <div class="mt-1">
            <label class="form-label">
                <span class="me-2 text-secondary">
                    {{ attribute.attributeName }}
                </span>
                <saving-status
                    :processing="saving"
                    :success="success"
                    :failed="failed">
                </saving-status>
            </label>

            <div v-if:="attribute.attributeDataTypeID === 1" class="mb-2">
                <label class="me-2">
                    <input type="radio" value="1" v-model="attribute.attributeValue.attributeValue" />
                    Yes
                </label>
                <label>
                    <input type="radio" value="0" v-model="attribute.attributeValue.attributeValue" />
                    No
                </label>
            </div>

            <div v-if:="attribute.attributeDataTypeID === 2" class="col-8">
                <select class="form-select" v-model="attribute.attributeValue.attributeValue">
                <option v-for:="option in attribute.attributeOptions" class="mt-2" :value="option.attributeOption">
                    {{option.attributeOption}}
                </option>
                </select>
            </div>

            <div v-if:="attribute.attributeDataTypeID === 3" >
                <textarea class="form-control col-4" rows="3" v-model.lazy="attribute.attributeValue.attributeValue"></textarea>
            </div>

            <div v-if:="attribute.attributeDataTypeID === 4" class="col-4">
                <input class="form-control" type="text" v-model.lazy="attribute.attributeValue.attributeValue" />
            </div>
        </div>
    `
}