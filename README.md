# ExLite

`exlite` is a lightweight utility library for Express.js that simplifies common server-side tasks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Error Handler Middleware: `httpErrorHandler`](#error-handler-middleware-httperrorhandler)
- [Wrapper: Simplifying Controllers](#wrapper-simplifying-controllers)
- [Http-Error](#http-error)
- [Http-Status](#http-status)
- [Standardized JSON Responses with `ApiRes`](#standardized-json-responses-with-apires)
- [Controller Class with `createController`](#controller-class-with-createcontroller)
- [Conclusion](#conclusion)
- [Contributing](#contributing)
- [Author](#author)

### Features:

- Simplifies route and controller management with pre-built helpers.
- Integrated error handling across all routes and middleware.
- Easy-to-use wrapper for automatically catching and handling errors.
- Customizable response formatting for consistent API outputs.
- Built-in support for dependency injection with [`tsyringe`](https://github.com/Microsoft/tsyringe).
- Flexible error handling with custom error classes.
- Efficient management of HTTP status codes and responses.

### Installation

Install by **`npm`**

```bash
npm install --save exlite
```

## Quick Start

Here’s a minimal setup to get you started with `exlite`:

```typescript
import express from 'express';
import {wrapper, httpErrorHandler} from 'exlite';

const app = express();

// Middleware
app.use(express.json());

// Example route using wrapper
const getUser = wrapper(async (req, res) => {
  const user = await getUserById(req.params.id);
  return ApiRes.ok(user); // Send user data in the response
});

// Routers
app.get('/user/:id', getUser);

// Error handling middleware
app.use(httpErrorHandler());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Error Handler Middleware: `httpErrorHandler`

`httpErrorHandler({dev: boolean, log?: (err) => void}): ErrorRequestHandler` Global error handler middleware that manages `HttpErrors` and unknown errors, returning appropriate JSON responses.

**Usage:**

```typescript
import {errorHandler} from 'exlite';

// Basic usage with default options
app.use(httpErrorHandler({dev: process.env.NODE_ENV !== 'production'}));

// Custom usage with logging in production mode
app.use(
  httpErrorHandler({
    dev: process.env.NODE_ENV !== 'production',
    log: err => logger.error(err),
  }),
);
```

_Note:_

- _`dev` is a flag that indicates whether the application is running in development mode. If true, error responses will include detailed information like the error message and stack trace. Defaults to true._
- _`write` is an optional callback function that logs or processes unknown errors. This can be used to log errors to a file or an external service for further inspection._

## Wrapper: Simplifying Controllers

In Express.js applications, request handler functions typically require `try-catch` blocks for error handling. This often results in repetitive, boilerplate code across route handlers. The `wrapper` function in `exlite` solves this issue by automatically managing `try-catch` behaviour for both async and sync functions. and provide other handler of features.

**Usage:**

```typescript
import {wrapper, ApiRes} from 'exlite';

// Route without wrapper (traditional approach with try-catch)
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Route using wrapper (simplified with exlite)
app.get(
  '/user/:id',
  wrapper(async (req, res) => {
    const user = await getUserById(req.params.id); // Fetch user from database
    return ApiRes.ok(user, 'User fetched successfully'); // Send success response using ApiRes
  }),
);
```

- **Example of manipulating cookies and header, etc with `ApiRes`**

```typescript
const login = wrapper(async (req, res) => {
  const {email, password} = req.body;
  const user = await loginUser(email, password);

  // Manually setting headers
  res.setHeader('X-Custom-Header', 'SomeHeaderValue');

  // Set multiple cookies for authentication
  res.cookie('access-token', user.accessToken, {
    httpOnly: true,
    secure: true, // Set to true in production with HTTPS
    maxAge: 3600000, // 1 hour
  });

  res.cookie('refresh-token', user.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 3600000, // 1 week
  });

  // api-response with token and user info
  return ApiRes.ok(user, 'Logged in successfully');
});
```

- **Example without `ApiRes`**

```typescript
// 1. example
const getHome = wrapper(() => 'Hello World!');
// 2. example
const getHome = wrapper(() => ({message: 'Hello World!'}));
// 3. example
const login = wrapper(async (req, res) => {
  const user = await getUserById(req.params.id);

  // Manually setting headers
  res.setHeader('X-Custom-Header', 'SomeHeaderValue');

  // Setting cookies
  res.cookie('access-token', user.accessToken, {
    httpOnly: true,
    secure: true, // Set to true in production with HTTPS
    maxAge: 3600000, // 1 hour
  });

  // Sending a custom JSON response
  return res.status(200).json({
    status: 'success',
    message: 'User fetched successfully',
    data: user,
  });
});
```

- **Example as `middleware`**

```typescript
import {Role} from './constants';
import {wrapper, ForbiddenError} from 'exlite';

/** user permission middleware */
export const permission = (...roles: Role[]) =>
  wrapper(async (req, _, next) => {
    const {user} = req;

    if (!roles || !user) return false;

    const checker = user && roles.includes(user?.role);

    if (!checker)
      throw new ForbiddenError(
        `User have not permission to access ${req.originalUrl}`,
      );

    next();
  });

// all permission middleware
export const onlyAdmin = permission(Role.ADMIN);
export const adminOrUser = permission(Role.ADMIN, Role.USER);
```

## Http-Error

The `HttpError` class standardizes error handling by extending the native `Error` class. It’s used to throw HTTP-related errors, which are then caught by the `httpErrorHandler` middleware.

**Usage:**

```typescript
import {HttpError, HttpStatus} from 'exlite';

// Example without wrapper
app.get('*', () => {
  throw new HttpError('Not Found', HttpStatus.NOT_FOUND); // Throw a 404 error
});

// Example with wrapper
app.post(
  '/example',
  wrapper(req => {
    if (!req.body.name) throw new BadRequestError('Name is required');
  }),
);
```

**HttpError(msg, status, details)**

- `msg` - this parameter accepts an error message, which can be a single string or an array of strings., `required`
- `status` - the status code of the error, mirroring `statusCode` for general compatibility, default is `500`
- `detail` - this is an `optional` plain object that contains additional information about the error.

```typescript
const err = new HttpError('Validation error.', 400, {
  username: 'Username is required',
  password: 'Password is required',
});
```

**Provide build common http-errors.**

- `BadRequestError`
- `UnAuthorizedError`
- `NotFoundError`
- `ConflictError`
- `ForbiddenError`
- `PaymentRequiredError`
- `NotImplementedError`
- `InternalServerError`

_Note: If only provides a status code, the `HttpError` class will automatically generate an appropriate error name based on that status code._

**`createError.isHttpError(value)`**

The `HttpError.isHttpError(value)` method is a useful way to determine if a specific value is an instance of the `HttpError` class. It will return `true` if the value is derived from the `HttpError` constructor, allowing you to easily identify HTTP-related errors in your application.

```typescript
// If it is an HttpError, send a JSON response with the error details
if (HttpError.isHttpError(err))
  return res.status(err.status).json(err.toJson());
else {
  // If it's not an HttpError, pass it to the next middleware for further handling
  next(err);
}
```

### Error Properties

When you create an instance of `HttpError`, it comes with several useful properties that help provide context about the error:

- **`status`**: The HTTP status code associated with the error (e.g., 404 for Not Found, 500 for Internal Server Error).
- **`message`**: A brief description of the error, which is useful for debugging and logging.
- **`stack`**: The stack trace of the error, available when the application is in development mode. This helps identify where the error occurred in your code.
- **`details`**: An optional property that can hold additional information about the error, such as validation issues or other relevant data.

### Custom ErrorHandler Middleware

```typescript
export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  // Handle known HttpError instances
  if (HttpError.isHttpError(err))
    return res.status(err.status).json(err.toJson());

  // Log unknown errors
  logger.error(err);

  // Create an InternalServerError for unknown errors
  const error = new InternalServerError(
    config.dev ? err.message : 'Something went wrong',
    config.dev ? err.stack : null,
  );
  return res.status(error.status).json(error.toJson());
};
```

### `toJson` Static Method

The `toJson` method is a static function that allows you to convert an `HttpError` instance into a structured JSON format. This is particularly useful for standardizing error responses sent to clients. When you call `toJson`, it returns an object containing the following properties:

- **`status`**: The HTTP status code of the error.
- **`message`**: A human-readable message describing the error.
- **`details`** (if applicable): Any additional information that provides context about the error.

This method ensures that your API consistently responds to errors in a uniform way, making it easier for clients to understand and handle error responses.

## Http-Status

The `HttpStatus` is utility to interact with HTTP status codes. **(2xx, 3xx, 4xx and 5xx)**.

**Usage:**

```typescript
import {HttpStatus} from 'exlite';

app.get('/status-example', (req, res) => {
  res.status(HttpStatus.OK).json({message: 'All good!'});
});
```

## Standardized JSON Responses with `ApiRes`

`ApiRes` provides a consistent structure for API responses. It includes several static methods that handle common response patterns, such as `ok`, `created` `paginated`.

**Usage:**

```typescript
import {ApiRes} from 'exlite';

// with paginated
const list = wrapper(async req => {
  const {data, meta} = await getUsers(req.query);
  return ApiRes.paginated(data, meta, 'Get users list successfully');
});

// with created
const create = wrapper(async req => {
  const user = await createUser(req.body);
  return ApiRes.created(user, 'User created successfully');
});

// with ok
const get = wrapper(async req => {
  const user = await getUser(req.params);
  return ApiRes.ok(user, 'Get user successfully');
});

// Routers
app.route('/').get(list).post(create);
app.route('/:id').get(get);
```

**ApiRes Methods**

- `ok(result, message)`: Returns a success response (HTTP 200).
- `created(result, message)`: Returns a resource creation response (HTTP 201).
- `paginated(data, meta, message)`: Returns a success response (HTTP 200).

## Controller Class with `createController`

Creating class-based controllers in Express.js can be complex due to the need for managing instance methods, binding this context, and handling dependencies. Traditional middleware functions typically rely on plain functions, making it challenging to encapsulate logic and state effectively in a class-based structure.

The `createController` function simplifies this process by providing an easy way to create class-based controllers and automatically handling method references internally. This allows developers to focus on their application logic rather than the boilerplate code required for class-based controllers.

`createController(cls, useTsyringe)`

- `cls` A class constructor function representing the controller.
- `useTsyringe` (optional): A boolean indicating whether to use `tsyringe` for dependency injection. Defaults to `true`.

**Usage:** without `tsyringe`

```typescript
// create a controller with a local instance.
const controller = createController(Controller, false);
...
// Retrieves and wraps a controller method for Express routes.
const handler = controller.getMethod('class-method-name');
```

- Controller `class`

```typescript
// auth.controller.ts
import {ApiRes} from 'exlite';
import {AuthService} from './auth.service';
import type {Request, Response} from 'express';

/** AuthController Class */
export class AuthController {
  #service = new AuthService(); // auth-service instance

  /** signin request handler */
  async signin(req: Request, res: Response) {
    const user = await this.#service.signin(req.body);
    return ApiRes.ok(user, 'User signed in successfully');
  }

  /** signup request handler */
  async signup(req: Request, res: Response) {
    const user = await this.#service.signup(req.body);
    return ApiRes.created(user, 'User signed up successfully');
  }
}
```

- Router configuration

```jsx
// auth.routes.ts
import {Router} from 'express';
import {createController} from 'exlite';
import {AuthController} from './auth.controller';

// Router
export const authRouter = Router();

// Create controller without using tsyrine
const auth = createController(AuthController, false);

// Initilize Routers
authRouter
  .post('/signin', auth.getMethod('signin'))
  .post('/signup', auth.getMethod('signup'));
```

### **if you want go with `tsyringe`**

you need to configure your project as follows:

1.  Install `tsyringe`:

    ```bash
    npm install tsyringe reflect-metadata
    ```

2.  Configure TypeScript:
    Add the following to your `tsconfig.json`:
    ```json
    {
      "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
      }
    }
    ```
3.  Import `reflect-metadata` in your main file (e.g., `app.ts` or `server.ts`):

    ```typescript
    import 'reflect-metadata';
    ```

**Usage:**

```jsx
// Create a controller with leverage the tsyringe dependency injection system.
const controller = createController(Controller); // Using tsyringe
...
// Retrieves and wraps a controller method for Express routes.
const handler = controller.getMethod('class-method-name');
```

- Service `class`

```typescript
// auth.service.ts
import {singleton} from 'tsyringe';

@singleton()
export class AuthService {
  async signin(data: object) {
    ''''
  }

  async signup(data: object) {
    ''''
  }
}
```

- Controller `class`

```typescript
// auth.controller.ts
import {singleton} from 'tsyringe';
import {AuthService} from './auth.service.ts';
import type {Request, Response} from 'express';

@singleton()
export class AuthController {
  constructor(private authService: AuthService) {}

  /** signin request handler */
  async signin(req: Request, res: Response) {
    const {access, refresh, user} = await this.authService.signin(req.body);
    res.cookie('access-token', access.token, {
      httpOnly: true,
      maxAge: access.maxAge,
    });
    res.cookie('refresh-token', refresh.token, {
      httpOnly: true,
      maxAge: refresh.maxAge,
    });
    return ApiRes.ok(user.id, 'User logged in successfully');
  }

  /** signup request handler */
  async signup(req: Request, res: Response) {
    const user = await this.authService.signup(req.body);
    return ApiRes.created(user.id, 'User created successfully');
  }
}
```

- Router configuration

```typescript
// auth.routes.ts
import {Router} from 'express';
import {createController} from 'exlite';
import {AuthController} from './auth.controller.ts';

// Router
export const authRouter = Router();

// Controller
const auth = createController(AuthController);

// Initilize Routers
authRouter
  .post('/signin', auth.getMethod('signin'))
  .post('/signup', auth.getMethod('signup'));
```

**_Note:_** _The `createController` is an feature that allows you to use `tsyringe` for dependency injection in your controllers. This is especially useful for larger applications where different services need to be injected into controllers._

## Conclusion

`exlite` is a powerful tool designed to simplify and enhance Express.js applications by providing essential features out of the box. Whether you’re building a simple API or a complex web application, `exlite` helps you maintain clean and manageable code.

## Author

- Created by **Aashish Panchal**.
- GitHub: [@aashishpanchal](https://github.com/aashishpanchal)

## License

[MIT © Aashish Panchal ](LICENSE)
