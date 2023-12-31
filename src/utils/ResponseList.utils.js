class ResponseList {
    constructor(status, message, data, total) {
        
        this.status = status;
        this.message = message;
        this.data = {
            content: data,
            total
        };
    }
}

module.exports = ResponseList;