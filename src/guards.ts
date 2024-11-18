import {type ErrorRequestHandler} from 'express';
import {HttpError, InternalServerError} from './errors';

type Options = {
  isDev?: boolean;
  write?: (error: unknown) => void;
};

/**
 * Express middleware to handle `HttpError` and unknown errors.
 *
 * - Sends JSON response for `HttpError` instances.
 * - Logs unknown errors and sends generic error response.
 * - Includes detailed error info in development (`isDev`).
 *
 * @param {Object} [options] - Options for error handling.
 * @param {boolean} [options.isDev=true] - Include detailed error information in responses if true. Default is `true`.
 * @param {(err: unknown) => void} [options.write] - Function to handle logging of unknown errors. If not provided, errors will not be logged.
 *
 * @returns {ErrorRequestHandler} - Middleware for handling errors.
 *
 * @example
 * // Basic usage with default options:
 * app.use(globalErrorHandler({ isDev: process.env.NODE_ENV !== 'production' }));
 *
 * // Custom usage with a logging function in production mode:
 * app.use(globalErrorHandler({
 *  isDev: process.env.NODE_ENV !== 'production',
 *  write: error => console.error(error)
 * }));
 */
export const globalErrorHandler = (
  options: Options = {},
): ErrorRequestHandler => {
  const {isDev = true, write = undefined} = options;

  return (err, req, res, next): any => {
    // Handle known HttpError instances
    if (HttpError.isHttpError(err))
      return res.status(err.status).json(err.toJson());

    // Write unknown errors if a write function is provided
    write?.(err);

    // Create an InternalServerError for unknown errors
    const error = new InternalServerError(
      isDev ? err.message : 'Something went wrong',
      isDev ? err.stack : null,
    );
    return res.status(error.status).json(error.toJson());
  };
};
