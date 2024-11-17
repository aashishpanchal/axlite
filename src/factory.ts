import {ApiRes} from './api-res';
import type {Response} from 'express';
import type {ReqHandler} from './types';

// Define the type for constructors
type Constructor<T> = new (...args: any[]) => T;

/**
 * Sends the appropriate response based on the result of the function.
 *
 * @param {unknown} result - The result of the handler function, can be an instance of ApiRes or other value.
 * @param {Response} res - Express response object.
 */
const handleResult = (result: unknown, res: Response): void => {
  // If the result is an ApiRes instance, sends the status and JSON response.
  if (result instanceof ApiRes) res.status(result.status).json(result.toJson());
  // Otherwise, sends the result directly.
  else if (result && result !== res) res.send(result);
};

/**
 * Wrapper for route handlers to support both synchronous and asynchronous functions.
 * It catches errors and forwards them to Express' error handler.
 *
 * @param {ReqHandler} func - The route handler function, can be sync or async.
 * @returns {ReqHandler} - Wrapped handler function that supports async errors and proper result handling.
 *
 * @example
 * // Example of wrapping a route handler
 * app.get('/example', wrapper(async (req, res) => {
 *   const result = await someAsyncFunction();
 *   res.json(result);
 * }));
 */
export const wrapper =
  (func: ReqHandler): ReqHandler =>
  (req, res, next) => {
    try {
      const result = func(req, res, next);
      // Handle async (Promise) or sync results.
      if (result instanceof Promise)
        result.then((value: any) => handleResult(value, res)).catch(next);
      else handleResult(result, res);
    } catch (error) {
      next(error);
    }
  };

/**
 * Resolves an instance of a class using tsyringe for dependency injection.
 * If tsyringe is not installed, it throws an error and terminates the process.
 *
 * @param {Constructor<T>} cls - The class constructor to resolve an instance of.
 * @returns {T} - An instance of the given class resolved by tsyringe's container.
 *
 * @throws If tsyringe is not installed, the process will exit with an error message.
 *
 * @example
 * const instance = resolver(AuthService);
 */
const resolver = <T>(cls: Constructor<T>): T => {
  let tsyringe: any = null;
  try {
    tsyringe = require('tsyringe');
  } catch (error) {
    console.log(
      'tsyringe is not installed. please install it, using package manager.',
    );
    console.log(error);
    process.exit(1);
  }
  // Resolve the class instance from the tsyringe container
  return tsyringe.container.resolve(cls);
};

/**
 * Creates an object to manage controller methods for routes.
 *
 * @param {Constructor<T>} cls - The controller class to create an instance of.
 * @param {boolean} [local=false] - If true, creates a local instance; otherwise, uses tsyringe for DI.
 * @returns {object} - An object with the `getMethod` function to retrieve controller methods.
 *
 * @example
 * const auth = createController(AuthController);
 * app.post('/login', auth.getMethod('login'));
 */
export const createController = <T>(
  cls: Constructor<T>,
  local: boolean = false,
): object => {
  const instance = local ? new cls() : resolver(cls);
  return {
    /**
     * Gets and wraps a method from the controller for routing.
     *
     * @param {keyof T} key - The method name to retrieve.
     * @returns {ReqHandler} - A wrapped and bound request handler.
     */
    getMethod: <K extends keyof T>(key: K): ReqHandler => {
      const handler = instance[key];
      if (typeof handler !== 'function') {
        throw new Error(
          `Handler ${key as string} is not a function of ${instance.constructor.name}`,
        );
      }
      return wrapper(handler.bind(instance));
    },
  };
};
