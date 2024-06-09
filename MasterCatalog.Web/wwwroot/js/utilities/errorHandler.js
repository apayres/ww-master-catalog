export class ErrorHandler {

    getMessage(obj, defaultMessage) {
        console.error('An error occurred: ', obj);

        if (defaultMessage) {
            return defaultMessage;
        }

        if (!obj.response || !obj.response.status) {
            return "An error occurred while processing your request.";
        }

        const serverMsg = obj.response.data;
        const status = obj.response.status;
        switch (status) {
            case 400:
                return serverMsg ?? "Invalid request. Please make sure all required fields have a value.";
                break;
            case 404:
                return serverMsg ?? "Item not found.";
                break;
            case 403:
                return "You are not authorized to complete this action.";
                break;
            case 401:
                return "Authentication error.";
                break;
            default:
                return "An error occurred while processing your request.";
                break;
        }
    }

}