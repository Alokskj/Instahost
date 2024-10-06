export class ApiResponse {
    statusCode: number;
    data?: object | null;
    message: string;
    success: boolean;

    constructor(statusCode: number, data?: object | null, message = 'success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}
