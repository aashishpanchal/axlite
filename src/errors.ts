import {HttpStatus} from './enums';
import type {BodyMessage, HttpErrorBody, HttpStatusNumber} from './types';

/**
 * Get a human-readable error name from the HTTP status code.
 * @param {number} status - The HTTP status code.
 * @returns {string} - The formatted error name.
 */
export const getErrorName = (status: number): string => {
  if (status < 400 || status > 511) return 'HttpError';
  // Find the key corresponding to the given status code
  const statusKey = HttpStatus[`${status as HttpStatusNumber}_NAME`];
  // If the status code is not found, return a generic error name
  if (!statusKey) return 'HttpError';
  const name = statusKey
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace(/\s+/g, '');
  return name.endsWith('Error') ? name : name.concat('Error');
};

/**
 * Base class for handling HTTP errors.
 * @extends {Error}
 */
export class HttpError extends Error {
  /**
   * @param {BodyMessage} msg - The error message.
   * @param {number} status - The HTTP status code. default is 500 (Internal Server Error).
   * @param {any} [detail] - Optional detailed error information.
   */
  constructor(
    readonly msg: BodyMessage,
    readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    readonly detail?: object,
  ) {
    super();
    this.name = getErrorName(status);
    this.message = typeof msg === 'string' ? msg : this.name;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convert the HttpError instance to a JSON object.
   * @returns {HttpErrorBody} - The JSON representation of the error.
   */
  public toJson(): HttpErrorBody {
    const obj: HttpErrorBody = {
      status: this.status,
      error: this.name,
      message: this.msg,
    };
    if (this.detail) obj['detail'] = this.detail;
    return obj;
  }

  /**
   * Check if the given error is an instance of HttpError.
   * @param {unknown} value - The error to check.
   * @returns {boolean} - True if the error is an instance of HttpError, false otherwise.
   */
  public static isHttpError = (value: unknown): value is HttpError =>
    value instanceof HttpError;
}

/**
 * Represents a Bad Request HTTP error (400).
 * @extends {HttpError}
 */
export class BadRequestError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.BAD_REQUEST, detail);
  }
}

/**
 * Represents a Conflict HTTP error (409).
 * @extends {HttpError}
 */
export class ConflictError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.CONFLICT, detail);
  }
}

/**
 * Represents a Forbidden HTTP error (403).
 * @extends {HttpError}
 */
export class ForbiddenError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.FORBIDDEN, detail);
  }
}

/**
 * Represents a Not Found HTTP error (404).
 * @extends {HttpError}
 */
export class NotFoundError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.NOT_FOUND, detail);
  }
}

/**
 * Represents an UnAuthorized HTTP error (401).
 * @extends {HttpError}
 */
export class UnAuthorizedError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.UNAUTHORIZED, detail);
  }
}

/**
 * Represents a Not Implemented HTTP error (501).
 * @extends {HttpError}
 */
export class NotImplementedError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.NOT_IMPLEMENTED, detail);
  }
}

/**
 * Represents a Payment Required HTTP error (402).
 * @extends {HttpError}
 */
export class PaymentRequiredError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.PAYMENT_REQUIRED, detail);
  }
}

/**
 * Represents an Internal Server Error HTTP error (500).
 * @extends {HttpError}
 */
export class InternalServerError extends HttpError {
  constructor(message: BodyMessage, detail?: object) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, detail);
  }
}
