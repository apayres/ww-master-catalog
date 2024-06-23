import { default as SuccessMessage } from './MessageSuccess.js'
import { default as ErrorMessage } from './MessageDanger.js'
import { default as InformationMessage } from './MessageInformation.js';
import { MessageType } from '/js/enums/messageType.js'

export const MessageCenter = {
    data() {
        return {
            text: '',
            type: ''
        }
    },    
    components: {
        SuccessMessage,
        ErrorMessage,
        InformationMessage
    },
    methods: {
        success(prompt) {
            this.text = prompt;
            this.type = MessageType.Success;
        },
        error(prompt) {
            this.text = prompt;
            this.type = MessageType.Error;
        },
        information(prompt) {
            this.text = prompt;
            this.type = MessageType.Information;
        }
    },
    computed: {
        isSuccess() {
            return this.type && this.type === MessageType.Success;
        },
        isError() {
            return this.type && this.type === MessageType.Error;
        },
        isInformation() {
            return this.type && this.type === MessageType.Information;
        }
    },
    template: `
       <success-message :text="text" v-if="isSuccess"></success-message>
       <error-message :text="text" v-if="isError"></error-message>
       <information-message :text="text" v-if="isInformation"></information-message>
    `
}
