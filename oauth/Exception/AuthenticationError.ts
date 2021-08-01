import CustomError from './CustomError';
class AuthenticationError extends CustomError {
    constructor(message: string|undefined){
        super(message);
        this.__status = 401;
        Object.setPrototypeOf(this,AuthenticationError.prototype);
    }
}
export default AuthenticationError;
