import { toRaw } from 'vue';
import { ErrorHandler } from '../../utilities/errorHandler.js';
import { ItemImagesService } from '../../services/itemImagesService.js';
import { default as MessageCenter } from '../Shared/MessageCenter/MessageCenter.js';
import { default as ButtonPrimary } from '../Shared/Buttons/ButtonPrimary.js';
import { default as ButtonPrimaryOutlined } from '../Shared/Buttons/ButtonPrimaryOutlined.js';
import { default as ButtonIcon } from '../Shared/Buttons/ButtonIcon.js';

const _errorHandler = new ErrorHandler();
const _service = new ItemImagesService();

export default {
    dialog: null,
    saveCallback: null,

    data() {
        return {
            images: [],
            loading: true
        }
    },
    props: {
        itemId: Number,
        upc: String
    },
    components: {
        ButtonPrimary,
        ButtonPrimaryOutlined,
        ButtonIcon,
        MessageCenter
    },
    methods: {
        loadImages() {
            const self = this;

            _service.getItemImages(self.itemId)
                .then(function (images) {
                    self.images = images;
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Problem loading image!');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        uploadClick() {
            const self = this;
            const el = document.getElementById('formFile');

            const formData = new FormData();
            formData.append('UploadData.FileData', el.files[0]);
            formData.append('UploadData.Container', this.upc);
            formData.append('ImageDetails.ItemID', this.itemId);

            _service.upload(formData)
                .then(function (image) {
                    self.images.push(image);
                    self.messageCenter.success('Image uploaded successfully!');
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Problem uploading image!');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    el.value = null;
                });
        },
        moveUp(image) {
            const index = this.images.findIndex((obj) => obj.itemImageID === image.itemImageID);
            if (index === 0) {
                return false;
            }

            this.images.splice(index, 1);
            this.images.splice(index - 1, 0, image);
            this.saveOrdering();
        },
        moveDown(image) {
            const index = this.images.findIndex((obj) => obj.itemImageID === image.itemImageID);
            if (index === this.images.length - 1) {
                return false;
            }

            this.images.splice(index, 1);
            this.images.splice(index + 1, 0, image);
            this.saveOrdering();
        },
        saveOrdering() {
            const self = this;
            self.loading = true;

            for (let i = 0; i < self.images.length; i++) {
                const image = self.images[i];
                image.displayOrder = i;

                const isLastImage = i == self.images.length - 1;

                _service.update(image)
                    .finally(function () {
                        if (isLastImage) {
                            self.loading = false;
                        }
                    });
            }
        },
        deleteClick(image) {
            const self = this;

            _service.delete(toRaw(image.itemImageID), toRaw(self.upc))
                .then(function (response) {
                    const index = self.images.findIndex((x) => x.itemImageID == image.itemImageID);
                    if (index > -1) {
                        self.images.splice(index, 1);
                    }
                })
                .catch(function (error) {
                    const msg = _errorHandler.getMessage(error, 'Problem deleting image!');
                    self.messageCenter.error(msg);
                })
                .finally(function () {
                    self.loading = false;
                });
        },
        cancelClick() {
            this.saveCallback();
            this.dialog.hide();
        },
        show(callback) {
            this.saveCallback = callback;
            this.loadImages();
            this.dialog.show();
        }
    },
    mounted() {
        this.dialog = new bootstrap.Modal(document.getElementById('imageManager'), {
            backdrop: 'static',
            keyboard: false
        });

        this.messageCenter = this.$refs.messageCenter;
    },
    template: `
        <div class="modal fade" id="imageManager" tabindex="-1" aria-labelledby="imageManagerLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="imageManagerLabel">Item Images</h1>
                    </div>
                    <div class="modal-body">
                        <message-center ref="messageCenter"></message-center>
                        <div class="row">
                            <div class="col-6">
                                <div class="m-2 row p-2 bg-light border" v-for="image in images">
                                    <div class="col-7">
                                        <img :src="image.absoluteUri" style="width: 100px; height: 100px;" />
                                    </div>

                                    <div class="col-5 text-end">
                                        <button-icon
                                            text="Delete"
                                            icon="bi-trash"
                                            classes="text-danger"
                                            :disabled="loading"
                                            v-on:click-event="deleteClick(image)">
                                        </button-icon>

                                        <button-icon
                                            icon="bi-chevron-down"
                                            tooltip="Move down"
                                            classes="ms-2"
                                            :disabled="loading"
                                            v-on:click-event="moveDown(image)">
                                        </button-icon>

                                        <button-icon
                                            icon="bi-chevron-up"
                                            tooltip="Move up"
                                            classes="ms-1"
                                            :disabled="loading"
                                            v-on:click-event="moveUp(image)">
                                        </button-icon>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <label for="formFile" class="form-label">Select an image to upload</label>
                                <input class="form-control" type="file" id="formFile">
                                <div class="text-end mt-2">
                                    <button type="button" v-on:click="uploadClick" class="btn btn-primary">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="cancelClick" class="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
}