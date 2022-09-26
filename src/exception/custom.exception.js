class CustomException extends Error {
    name;
    message;
    statusCode;

    constructor(message, statusCode = 500) {
        super(message);

        this.name = "CustomException";
        this.message = message;
        this.statusCode = statusCode;
    }
}

// status 4XX : Client error responses
class BadRequestException extends CustomException {
    constructor(message) {
        super(message);

        this.name = "UnauthorizedException";
        this.statusCode = 400;
    }
}

class ForbiddenException extends CustomException {
    constructor(message) {
        super(message);

        this.name = "ForbiddenException";
        this.statusCode = 403;
    }
}

class NotFoundException extends CustomException {
    constructor(message) {
        super(message);

        this.name = "NotFoundException";
        this.statusCode = 404;
    }
}

class ConflictException extends CustomException {
    constructor(message) {
        super(message);

        this.name = "ConflictException";
        this.statusCode = 409;
    }
}

// status 5XX : Server error responses
class UnknownException extends CustomException {
    constructor(message) {
        super(message);

        this.name = "UnknownException";
        this.statusCode = 500;
    }
}

export {
    CustomException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    UnknownException,
};
