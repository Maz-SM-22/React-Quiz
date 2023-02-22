class GeneralError extends Error {
    constructor(message) {
        super(message);
    }

    getStatusCode() {
        if (this instanceof BadRequest) {
            return 400;
        }
        if (this instanceof NotFoundError) {
            return 404;
        }
    }
}

class BadRequest extends GeneralError { };
class NotFoundError extends GeneralError { };

module.exports = { GeneralError, BadRequest, NotFoundError }; 
