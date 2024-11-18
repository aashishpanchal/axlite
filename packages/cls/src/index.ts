import {ReqHandler, wrapper} from 'exlite';

// Define the type for constructors
type Constructor<T> = new (...args: any[]) => T;

/**
 * Defines the type of container to resolve the controller instance:
 * - `'local'`: Creates a new local instance.
 * - `'tsyringe'`: Uses `tsyringe` for dependency injection.
 */
type ContainerType = 'local' | 'tsyringe';

/**
 * Resolves an instance of a class based on the container type.
 *
 * @param {Constructor<T>} cls - The class constructor to resolve an instance of.
 * @param {ContainerType} type - The container type (`'local'` or `'tsyringe'`).
 * @returns {T} - An instance of the given class resolved accordingly.
 *
 * @throws If `tsyringe` is not installed when `type` is `'tsyringe'`, the process will exit with an error.
 *
 * @example
 * const localInstance = resolve(AuthService, 'local');
 * const diInstance = resolve(AuthService, 'tsyringe');
 */
const resolve = <T>(cls: Constructor<T>, type: ContainerType): T => {
  let tsyringe: any = null;

  // Handle local instance creation
  if (type === 'local') return new cls();

  // Handle tsyringe dependency injection
  try {
    tsyringe = require('tsyringe');
  } catch (error) {
    console.error(
      'tsyringe is not installed. Please install it using your package manager.',
    );
    console.error(error);
    process.exit(1);
  }

  return tsyringe.container.resolve(cls);
};

/**
 * Retrieves and wraps a method from an instance.
 *
 * @param {T} instance - The instance containing the method.
 * @param {keyof T} key - The method name to retrieve.
 * @returns {ReqHandler} - A wrapped and bound request handler.
 *
 * @throws If the method is not a function.
 */
const getWrappedMethod = <T, K extends keyof T>(
  instance: T,
  key: K,
): ReqHandler => {
  const handler = instance[key];
  if (typeof handler !== 'function') {
    throw new Error(
      `Handler ${key as string} is not a function of ${instance.constructor.name}`,
    );
  }
  return wrapper(handler.bind(instance));
};

/**
 * Creates an object to manage controller methods for routes.
 *
 * @param {Constructor<T>} cls - The controller class to create an instance of.
 * @param {ContainerType} [type='local'] - The container type for instance resolution.
 * @returns {object} - An object with the `getMethod` function to retrieve and wrap controller methods.
 *
 * @example
 * const authController = createController(AuthController, 'tsyringe');
 * app.post('/login', authController.getMethod('login'));
 */
export const createController = <T>(
  cls: Constructor<T>,
  type: ContainerType = 'local',
): object => {
  const instance = resolve(cls, type);

  return {
    /**
     * Retrieves and wraps a method from the controller instance for routing.
     *
     * @param {keyof T} key - The method name to retrieve.
     * @returns {ReqHandler} - A wrapped and bound request handler.
     */
    getMethod: <K extends keyof T>(key: K): ReqHandler =>
      getWrappedMethod(instance, key),
  };
};

/**
 * A base class for managing controllers with `tsyringe` dependency injection.
 */
export class Controller {
  /**
   * Retrieves and wraps a method from the controller for routing.
   *
   * @param {keyof T} key - The method name to retrieve.
   * @returns {ReqHandler} - A wrapped and bound request handler.
   *
   * @throws If the method is not a function.
   *
   * @example
   * app.get('/users', UserController.getMethod('getUsers'));
   */
  static getMethod<T, K extends keyof T>(
    this: Constructor<T> & typeof Controller,
    key: K,
  ): ReqHandler {
    return getWrappedMethod(resolve(this, 'tsyringe'), key);
  }
}

/**
 * A base class for managing local-only controllers without `tsyringe`.
 * Ensures a single local instance per controller class.
 */
export class LocalController {
  static #instance: InstanceType<any> | null = null;

  /**
   * Retrieves and wraps a method from the controller for routing.
   *
   * @param {keyof T} key - The method name to retrieve.
   * @returns {ReqHandler} - A wrapped and bound request handler.
   *
   * @throws If the method is not a function.
   *
   * @example
   * app.get('/products', ProductController.getMethod('getProducts'));
   */
  static getMethod<T, K extends keyof T>(
    this: Constructor<T> & typeof LocalController,
    key: K,
  ): ReqHandler {
    const instance = (this.#instance ??= resolve(this, 'local'));
    return getWrappedMethod(instance, key);
  }
}
