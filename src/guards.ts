import {type ErrorRequestHandler} from 'express';
import {HttpError, InternalServerError} from './errors';

type Options = {
  dev?: boolean;
  log?: (err: unknown) => void;
};

/**
 * Express middleware to handle `HttpError` and unknown errors.
 *
 * - Sends JSON response for `HttpError` instances.
 * - Logs unknown errors and sends generic error response.
 * - Includes detailed error info in development (`dev`).
 *
 * @param {Object} [options] - Options for error handling.
 * @param {boolean} [options.dev=true] - Show detailed error info in development. default `true`
 * @param {(err: unknown) => void} [options.log] - Function to log unknown errors. default `console.error`
 *
 * @returns {ErrorRequestHandler} - Middleware for handling errors.
 *
 * @example
 * // Basic usage with default options:
 * app.use(httpErrorHandler({ dev: process.env.NODE_ENV !== 'production' }));
 *
 * // Custom usage with logging in production mode:
 * app.use(httpErrorHandler({
 *  dev: process.env.NODE_ENV !== 'production',
 *  log: err => logger.error(err)
 * }));
 */
export const httpErrorHandler = (
  options: Options = {},
): ErrorRequestHandler => {
  const {dev = true, log = console.error} = options;
  return (err, req, res, next): any => {
    // Handle known HttpError instances
    if (HttpError.isHttpError(err))
      return res.status(err.status).json(err.toJson());

    // Log unknown errors if a write function is provided
    log?.(err);

    // Create an InternalServerError for unknown errors
    const error = new InternalServerError(
      dev ? err.message : 'Something went wrong',
      dev ? err.stack : null,
    );
    return res.status(error.status).json(error.toJson());
  };
};
