import {ApiRes} from './api-res';
import type {Response} from 'express';
import type {ReqHandler} from './types';

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
