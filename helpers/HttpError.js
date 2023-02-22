const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

// class HttpError extends Error {
//   constructor(statusCode, message) {
//     super();
//     this.statusCode = statusCode;
//     this.message = message;
//   }
// }

module.exports = HttpError;
