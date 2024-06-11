import { default as SuccessMessage } from './MessageSuccess.js'
import { default as ErrorMessage } from './MessageDanger.js'
import { MessageType } from '/js/enums/messageType.js'

export default {
    data() {
        return {
            text: '',
            type: ''
        }
    },    
    components: {
        SuccessMessage,
        ErrorMessage
    },
    methods: {
        success(prompt) {
            this.text = prompt;
            this.type = MessageType.Success;
        },
        error(prompt) {
            this.text = prompt;
            this.type = MessageType.Error;
        }
    },
    computed: {
        isSuccess() {
            return this.type && this.type === MessageType.Success;
        },
        isError() {
            return this.type && this.type === MessageType.Error;
        }
    },
    template: `
       <success-message :text="text" v-if="isSuccess"></success-message>
       <error-message :text="text" v-if="isError"></error-message>
    `
}
