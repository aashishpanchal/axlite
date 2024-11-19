import {wrapper} from './factory';
import {HttpError, InternalServerError} from './errors';
import type {ErrorRequestHandler} from 'express';

type Options = {
  isDev?: boolean;
  write?: (error: unknown) => void;
};
type Constructor<T> = new (...args: any[]) => T;
type ContainerType = 'local' | 'tsyringe' | 'typedi';

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

/**
 * Creates a controller object to manage route methods dynamically.
 *
 * @param cls - The controller class to instantiate.
 * @param type - The container type for resolving the instance.
 * @returns An object with `getMethod` for retrieving wrapped methods.
 */
export const wrapperController = <T>(
  cls: Constructor<T>,
  type: ContainerType,
) => {
  const instance = resolve(cls, type);

  /**
   * Retrieves and wraps a method from the controller for routing.
   *
   * @param key - The method name to retrieve.
   * @returns A wrapped request handler.
   */
  const getMethod = <K extends keyof T>(key: K) => {
    // get handler from instance
    const handler = instance[key];
    if (typeof handler !== 'function')
      throw new Error(
        `The key '${String(key)}' is not a function in ${instance.constructor.name}.`,
      );
    // return handler with wrapper
    return wrapper(handler.bind(instance));
  };

  return {getMethod};
};

/**
 * Resolves an instance of a class based on the container type.
 *
 * @param cls - The class constructor to resolve an instance of.
 * @param type - The container type (`'local'` or `'tsyringe'`).
 * @returns An instance of the given class resolved accordingly.
 */
const resolve = <T>(cls: Constructor<T>, type: ContainerType): T => {
  switch (type) {
    case 'local':
      return new cls();
    case 'tsyringe':
      try {
        const {container} = require('tsyringe');
        return container.resolve(cls);
      } catch (error: any) {
        throw new Error(
          `Failed to resolve ${cls.name} with 'tsyringe'. Ensure 'tsyringe' is installed.\n${error.message}`,
        );
      }
    case 'typedi':
      try {
        const {Container} = require('typedi');
        return Container.get(cls);
      } catch (error: any) {
        throw new Error(
          `Failed to resolve ${cls.name} with 'typedi'. Ensure 'typedi' is installed.\n${error.message}`,
        );
      }
    default:
      throw new Error(`Invalid container type: ${type}`);
  }
};
