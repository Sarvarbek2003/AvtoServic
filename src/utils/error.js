class ServerError extends Error {
	constructor(message) {
		super()
		this.status = 500
		this.message = "Internal Server Error: " + message
	}
}

class ClientError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = message
	}
}


export default ClientError