class CustomError extends Error{
    protected __status: number = 500;
    constructor(message?: string){
        super(message);
        Object.setPrototypeOf(this,CustomError.prototype);
    }
    status(){
        return this.__status;
    }
    log(){
        return `message: ${this.message}\nstack: ${this.stack}`;
    }
}

export default CustomError;