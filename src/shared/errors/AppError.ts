class Error{
    public readonly message: string

    public readonly statusCode: number

    constructor(massage: string, statusCode = 400){
        this.message = massage
        this.statusCode = statusCode
    }

}
export default Error