import CustomError from './CustomError';
class DomainError extends CustomError {
    constructor(message: string|undefined){
        super(message);
        this.__status = 422;
        Object.setPrototypeOf(this,DomainError.prototype);
    }
}
export default DomainError;
