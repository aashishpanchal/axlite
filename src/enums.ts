/**
 * Enum representing HTTP status codes and their names.
 *
 * This enum includes a comprehensive list of HTTP status codes from
 * informational (100) to network authentication required (511).
 *
 * @publicApi
 */
export const HttpStatus = Object.freeze({
  /** Continue with the request. */
  CONTINUE: 100,
  /** Switching protocols. */
  SWITCHING_PROTOCOLS: 101,
  /** Request is being processed. */
  PROCESSING: 102,
  /** Early hints for the client. */
  EARLY_HINTS: 103,
  /** Request succeeded. */
  OK: 200,
  /** Resource created. */
  CREATED: 201,
  /** Request accepted for processing. */
  ACCEPTED: 202,
  /** Non-authoritative information. */
  NON_AUTHORITATIVE_INFORMATION: 203,
  /** No content to send. */
  NO_CONTENT: 204,
  /** Content reset. */
  RESET_CONTENT: 205,
  /** Partial content delivered. */
  PARTIAL_CONTENT: 206,
  /** Multiple choices available. */
  AMBIGUOUS: 300,
  /** Resource moved permanently. */
  MOVED_PERMANENTLY: 301,
  /** Resource found at another URI. */
  FOUND: 302,
  /** See other resource. */
  SEE_OTHER: 303,
  /** Resource not modified. */
  NOT_MODIFIED: 304,
  /** Temporary redirect. */
  TEMPORARY_REDIRECT: 307,
  /** Permanent redirect. */
  PERMANENT_REDIRECT: 308,
  /** Bad request. */
  BAD_REQUEST: 400,
  /** Authentication required. */
  UNAUTHORIZED: 401,
  /** Payment required. */
  PAYMENT_REQUIRED: 402,
  /** Access forbidden. */
  FORBIDDEN: 403,
  /** Resource not found. */
  NOT_FOUND: 404,
  /** Method not allowed. */
  METHOD_NOT_ALLOWED: 405,
  /** Not acceptable content. */
  NOT_ACCEPTABLE: 406,
  /** Proxy authentication required. */
  PROXY_AUTHENTICATION_REQUIRED: 407,
  /** Request timed out. */
  REQUEST_TIMEOUT: 408,
  /** Conflict with current state. */
  CONFLICT: 409,
  /** Resource gone. */
  GONE: 410,
  /** Length required. */
  LENGTH_REQUIRED: 411,
  /** Precondition failed. */
  PRECONDITION_FAILED: 412,
  /** Payload too large. */
  PAYLOAD_TOO_LARGE: 413,
  /** URI too long. */
  URI_TOO_LONG: 414,
  /** Unsupported media type. */
  UNSUPPORTED_MEDIA_TYPE: 415,
  /** Requested range not satisfiable. */
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  /** Expectation failed. */
  EXPECTATION_FAILED: 417,
  /** I'm a teapot. */
  I_AM_A_TEAPOT: 418,
  /** Misdirected request. */
  MISDIRECTED_REQUEST: 421,
  /** Unprocessable entity. */
  UNPROCESSABLE_ENTITY: 422,
  /** Failed dependency. */
  FAILED_DEPENDENCY: 424,
  /** Precondition required. */
  PRECONDITION_REQUIRED: 428,
  /** Too many requests. */
  TOO_MANY_REQUESTS: 429,
  /** Internal server error. */
  INTERNAL_SERVER_ERROR: 500,
  /** Not implemented. */
  NOT_IMPLEMENTED: 501,
  /** Bad gateway. */
  BAD_GATEWAY: 502,
  /** Service unavailable. */
  SERVICE_UNAVAILABLE: 503,
  /** Gateway timeout. */
  GATEWAY_TIMEOUT: 504,
  /** HTTP version not supported. */
  HTTP_VERSION_NOT_SUPPORTED: 505,
  /** Variant also negotiates. */
  VARIANT_ALSO_NEGOTIATES: 506,
  /** Insufficient storage. */
  INSUFFICIENT_STORAGE: 507,
  /** Loop detected. */
  LOOP_DETECTED: 508,
  /** Bandwidth limit exceeded. */
  BANDWIDTH_LIMIT_EXCEEDED: 509,
  /** Not extended. */
  NOT_EXTENDED: 510,
  /** Network authentication required. */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
  /** Names of HTTP status codes */
  NAMES: Object.freeze({
    $100: 'CONTINUE',
    $101: 'SWITCHING_PROTOCOLS',
    $102: 'PROCESSING',
    $103: 'EARLY_HINTS',
    $200: 'OK',
    $201: 'CREATED',
    $202: 'ACCEPTED',
    $203: 'NON_AUTHORITATIVE_INFORMATION',
    $204: 'NO_CONTENT',
    $205: 'RESET_CONTENT',
    $206: 'PARTIAL_CONTENT',
    $300: 'AMBIGUOUS',
    $301: 'MOVED_PERMANENTLY',
    $302: 'FOUND',
    $303: 'SEE_OTHER',
    $304: 'NOT_MODIFIED',
    $307: 'TEMPORARY_REDIRECT',
    $308: 'PERMANENT_REDIRECT',
    $400: 'BAD_REQUEST',
    $401: 'UNAUTHORIZED',
    $402: 'PAYMENT_REQUIRED',
    $403: 'FORBIDDEN',
    $404: 'NOT_FOUND',
    $405: 'METHOD_NOT_ALLOWED',
    $406: 'NOT_ACCEPTABLE',
    $407: 'PROXY_AUTHENTICATION_REQUIRED',
    $408: 'REQUEST_TIMEOUT',
    $409: 'CONFLICT',
    $410: 'GONE',
    $411: 'LENGTH_REQUIRED',
    $412: 'PRECONDITION_FAILED',
    $413: 'PAYLOAD_TOO_LARGE',
    $414: 'URI_TOO_LONG',
    $415: 'UNSUPPORTED_MEDIA_TYPE',
    $416: 'REQUESTED_RANGE_NOT_SATISFIABLE',
    $417: 'EXPECTATION_FAILED',
    $418: 'I_AM_A_TEAPOT',
    $421: 'MISDIRECTED_REQUEST',
    $422: 'UNPROCESSABLE_ENTITY',
    $424: 'FAILED_DEPENDENCY',
    $428: 'PRECONDITION_REQUIRED',
    $429: 'TOO_MANY_REQUESTS',
    $500: 'INTERNAL_SERVER_ERROR',
    $501: 'NOT_IMPLEMENTED',
    $502: 'BAD_GATEWAY',
    $503: 'SERVICE_UNAVAILABLE',
    $504: 'GATEWAY_TIMEOUT',
    $505: 'HTTP_VERSION_NOT_SUPPORTED',
    $506: 'VARIANT_ALSO_NEGOTIATES',
    $507: 'INSUFFICIENT_STORAGE',
    $508: 'LOOP_DETECTED',
    $509: 'BANDWIDTH_LIMIT_EXCEEDED',
    $510: 'NOT_EXTENDED',
    $511: 'NETWORK_AUTHENTICATION_REQUIRED',
  }),
});
