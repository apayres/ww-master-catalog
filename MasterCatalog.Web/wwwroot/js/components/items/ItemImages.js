import { ItemImagesService } from '../../services/itemImagesService.js';
import { Item } from '../../models/item.js';
import { default as ImageManager } from './ImageManager.js';
import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';

const _service = new ItemImagesService();

export default {
    data() {
        return {
            loading: true,
            item: new Item(),
            images: [],
            primaryImage: null
        }
    },
    components: {
        ButtonIcon,
        ImageManager
    },
    methods: {
        loadImages(item) {
            const self = this;
            self.item = item;
            self.images = [];

            if (!self.item.itemID) {
                self.loading = false;
                return false;
            }

            _service.getItemImages(self.item.itemID)
                .then(function (response) {
                    self.images = response.data;
                    if (self.images && self.images.length) {
                        self.primaryImage = self.images[0];
                        self.images.splice(0, 1);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        imagesClick() {
            const self = this;
            const imageManager = self.$refs.imageManager;
            
            imageManager.show(function () {
                self.loadImages(self.item);
            });
        }
    },
    template: `
        <div class="p-3 mb-2">
            <div class="row mb-3">
                <div class="col-6">
                    <h4>Images</h4>
                </div>
                <div class="col-6 text-end">
                    <button-icon
                        text="Manage"
                        icon="bi-images"
                        tooltip="Manage item images"
                        v-on:click-event="imagesClick"
                        v-if="!loading && item.itemID">
                    </button-icon>
                </div>
            </div>

            <div v-if="loading" class="placeholder-glow" style="height: 250px;">
                <div class="placeholder p-3 w-100 h-100"></div>
            </div>

            <div v-if="!loading && item.itemID">
                <div>
                    <img
                        v-if="primaryImage"
                        :src="primaryImage.absoluteUri"
                        class="w-100 border" />

                        <div v-if="images.length > 0">
                            <img
                                v-for="image in images"
                                :src="image.absoluteUri"
                                class="m-2 ms-0 border"
                                style="width: 60px;" />
                        </div>
                </div>

                <image-manager                
                    :item-id="item.itemID"
                    :upc="item.upc"
                    ref="imageManager">
                </image-manager>
            </div>

            <div v-if="!loading && !item.itemID">
                <div class="alert alert-light" role="alert">Images can be added once item has been created</div>
            </div>

            <div v-if="!loading && item.itemID && primaryImage == null">
                <div class="alert alert-light" role="alert">Click the 'Manage' button above to upload item images</div>
            </div>
        </div>
    `
}