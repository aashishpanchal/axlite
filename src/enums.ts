/**
 * Enum representing HTTP status codes.
 *
 * @publicApi http-status code
 */
export const HttpStatus = Object.freeze({
  /** Continue with the request. */
  CONTINUE: 100,
  '100_NAME': 'CONTINUE',
  /** Switching protocols. */
  SWITCHING_PROTOCOLS: 101,
  '101_NAME': 'SWITCHING_PROTOCOLS',
  /** Request is being processed. */
  PROCESSING: 102,
  '102_NAME': 'PROCESSING',
  /** Early hints for the client. */
  EARLYHINTS: 103,
  '103_NAME': 'EARLY_HINTS',
  /** Request succeeded. */
  OK: 200,
  '200_NAME': 'OK',
  /** Resource created. */
  CREATED: 201,
  '201_NAME': 'CREATED',
  /** Request accepted for processing. */
  ACCEPTED: 202,
  '202_NAME': 'ACCEPTED',
  /** Non-authoritative information. */
  NON_AUTHORITATIVE_INFORMATION: 203,
  '203_NAME': 'NON_AUTHORITATIVE_INFORMATION',
  /** No content to send. */
  NO_CONTENT: 204,
  '204_NAME': 'NO_CONTENT',
  /** Content reset. */
  RESET_CONTENT: 205,
  '205_NAME': 'RESET_CONTENT',
  /** Partial content delivered. */
  PARTIAL_CONTENT: 206,
  '206_NAME': 'PARTIAL_CONTENT',
  /** Multiple choices available. */
  AMBIGUOUS: 300,
  '300_NAME': 'AMBIGUOUS',
  /** Resource moved permanently. */
  MOVED_PERMANENTLY: 301,
  '301_NAME': 'MOVED_PERMANENTLY',
  /** Resource found at another URI. */
  FOUND: 302,
  '302_NAME': 'FOUND',
  /** See other resource. */
  SEE_OTHER: 303,
  '303_NAME': 'SEE_OTHER',
  /** Resource not modified. */
  NOT_MODIFIED: 304,
  '304_NAME': 'NOT_MODIFIED',
  /** Temporary redirect. */
  TEMPORARY_REDIRECT: 307,
  '307_NAME': 'TEMPORARY_REDIRECT',
  /** Permanent redirect. */
  PERMANENT_REDIRECT: 308,
  '308_NAME': 'PERMANENT_REDIRECT',
  /** Bad request. */
  BAD_REQUEST: 400,
  '400_NAME': 'BAD_REQUEST',
  /** Authentication required. */
  UNAUTHORIZED: 401,
  '401_NAME': 'UNAUTHORIZED',
  /** Payment required. */
  PAYMENT_REQUIRED: 402,
  '402_NAME': 'PAYMENT_REQUIRED',
  /** Access forbidden. */
  FORBIDDEN: 403,
  '403_NAME': 'FORBIDDEN',
  /** Resource not found. */
  NOT_FOUND: 404,
  '404_NAME': 'NOT_FOUND',
  /** Method not allowed. */
  METHOD_NOT_ALLOWED: 405,
  '405_NAME': 'METHOD_NOT_ALLOWED',
  /** Not acceptable content. */
  NOT_ACCEPTABLE: 406,
  '406_NAME': 'NOT_ACCEPTABLE',
  /** Proxy authentication required. */
  PROXY_AUTHENTICATION_REQUIRED: 407,
  '407_NAME': 'PROXY_AUTHENTICATION_REQUIRED',
  /** Request timed out. */
  REQUEST_TIMEOUT: 408,
  '408_NAME': 'REQUEST_TIMEOUT',
  /** Conflict with current state. */
  CONFLICT: 409,
  '409_NAME': 'CONFLICT',
  /** Resource gone. */
  GONE: 410,
  '410_NAME': 'GONE',
  /** Length required. */
  LENGTH_REQUIRED: 411,
  '411_NAME': 'LENGTH_REQUIRED',
  /** Precondition failed. */
  PRECONDITION_FAILED: 412,
  '412_NAME': 'PRECONDITION_FAILED',
  /** Payload too large. */
  PAYLOAD_TOO_LARGE: 413,
  '413_NAME': 'PAYLOAD_TOO_LARGE',
  /** URI too long. */
  URI_TOO_LONG: 414,
  '414_NAME': 'URI_TOO_LONG',
  /** Unsupported media type. */
  UNSUPPORTED_MEDIA_TYPE: 415,
  '415_NAME': 'UNSUPPORTED_MEDIA_TYPE',
  /** Requested range not satisfiable. */
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  '416_NAME': 'REQUESTED_RANGE_NOT_SATISFIABLE',
  /** Expectation failed. */
  EXPECTATION_FAILED: 417,
  '417_NAME': 'EXPECTATION_FAILED',
  /** I'm a teapot. */
  I_AM_A_TEAPOT: 418,
  '418_NAME': 'I_AM_A_TEAPOT',
  /** Misdirected request. */
  MISDIRECTED: 421,
  '421_NAME': 'MISDIRECTED',
  /** Unprocessable entity. */
  UNPROCESSABLE_ENTITY: 422,
  '422_NAME': 'UNPROCESSABLE_ENTITY',
  /** Failed dependency. */
  FAILED_DEPENDENCY: 424,
  '424_NAME': 'FAILED_DEPENDENCY',
  /** Precondition required. */
  PRECONDITION_REQUIRED: 428,
  '428_NAME': 'PRECONDITION_REQUIRED',
  /** Too many requests. */
  TOO_MANY_REQUESTS: 429,
  '429_NAME': 'TOO_MANY_REQUESTS',
  /** Internal server error. */
  INTERNAL_SERVER_ERROR: 500,
  '500_NAME': 'INTERNAL_SERVER_ERROR',
  /** Not implemented. */
  NOT_IMPLEMENTED: 501,
  '501_NAME': 'NOT_IMPLEMENTED',
  /** Bad gateway. */
  BAD_GATEWAY: 502,
  '502_NAME': 'BAD_GATEWAY',
  /** Service unavailable. */
  SERVICE_UNAVAILABLE: 503,
  '503_NAME': 'SERVICE_UNAVAILABLE',
  /** Gateway timeout. */
  GATEWAY_TIMEOUT: 504,
  '504_NAME': 'GATEWAY_TIMEOUT',
  /** HTTP version not supported. */
  HTTP_VERSION_NOT_SUPPORTED: 505,
  '505_NAME': 'HTTP_VERSION_NOT_SUPPORTED',
  /** Variant also negotiates. */
  VARIANT_ALSO_NEGOTIATES: 506,
  '506_NAME': 'VARIANT_ALSO_NEGOTIATES',
  /** Insufficient storage. */
  INSUFFICIENT_STORAGE: 507,
  '507_NAME': 'INSUFFICIENT_STORAGE',
  /** Loop detected. */
  LOOP_DETECTED: 508,
  '508_NAME': 'LOOP_DETECTED',
  /** Bandwidth limit exceeded. */
  BANDWIDTH_LIMIT_EXCEEDED: 509,
  '509_NAME': 'BANDWIDTH_LIMIT_EXCEEDED',
  /** Not extended. */
  NOT_EXTENDED: 510,
  '510_NAME': 'NOT_EXTENDED',
  /** Network authentication required. */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
  '511_NAME': 'NETWORK_AUTHENTICATION_REQUIRED',
});
