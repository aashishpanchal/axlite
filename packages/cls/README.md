# **@exlite/cls** 🚀

A lightweight utility for managing class-based controllers in Express.js with support for dependency injection via `tsyringe`. Simplify your route handling with flexible controller management, using either dependency injection or local instances.

## **Motivation** 💡

Class-based controllers in Express.js can be tricky due to manual `this` binding and dependency management. `@exlite/cls` makes this easier by providing utilities to handle class-based controllers seamlessly.

- Use `tsyringe` for dependency injection, or create local instances for simplicity.
- Simplify route handling by wrapping controller methods dynamically.

## 🧭 Navigation

- [Features](#features-)
- [Installation](#installation-)
- [Setup](#setup-)
- [`createController` Function](#createcontroller-function)
- [`Controller` Class](#controller-class)
- [`LocalController` Class](#localcontroller-class)
- [Choose You Method](#choose-your-method-)
- [Conclusion](#conclusion-)
- [Contributing](#contributing-)
- [Author](#author-️)
- [License](#license-)
- [Conclusion](#conclusion-)

## **Features** ✨

- Use `createController` for dynamic controller instances or class-based static `Controller`/`LocalController` methods.
- Automatically resolve controller dependencies, if you using `tsyringe`.
- Create local controller instances when dependency injection is not required.
- Automatically bind controller methods to their instances.

## Installation 📥

Install `@exlite/cls` and its dependencies:

```bash
npm install --save exlite @exlite/cls
```

Ensure `tsyringe` and `reflect-metadata` are installed for dependency injection **(if use it)**:

```bash
npm install tsyringe reflect-metadata
```

---

## Setup 🔧

1. **Configure TypeScript**  
   Add the following to your `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true
     }
   }
   ```

2. **Import `reflect-metadata`**  
   Import this at the entry point of your application (e.g., `app.ts` or `server.ts`):

   ```typescript
   import 'reflect-metadata';
   ```

## `createController` Function

The `createController` function simplifies the process of creating class-based controllers and automatically handles method references, dependency injection.

#### `createController` Arguments:

- **`cls`** _(required)_: The controller class to create an instance of.
- **`type`** _(optional)_: Specifies the type of container to use for dependency injection.
  - **Default**: `'local'`
  - **Options**: `'local'` or `'tsyringe'`

#### **`getMethod(key: string): ReqHandler`**

- **Purpose**: Retrieve and wrap a controller method for use in routes.
- **Parameter**: `key` - Name of the method to retrieve.
- **Return**: A bound and wrapped `ReqHandler`.

#### Example:

```typescript
// controller.ts
import {injectable} from 'tsyringe';
import {Controller} from '@exlite/cls';

@injectable()
class ExampleController extends Controller {
  async exampleMethod(req: Request, res: Response) {
    res.send('Hello, World!');
  }
}

// Create controller with tsyringe dependency injection
const example = createController(ExampleController, 'tsyringe');

// Router configuration
app.get('/example', example.getMethod('exampleMethod'));
```

You can also create controllers without `tsyringe` by using local instances:

```typescript
const example = createController(ExampleController, 'local');
app.get('/example', example.getMethod('exampleMethod'));
```

## `Controller` Class

The `Controller` class is a base class for defining and managing route controllers with support for `tsyringe` dependency injection.

#### Static Method **`getMethod(key: string): ReqHandler`**:

Retrieves and wraps a method from the controller for routing.

#### Usage:

```typescript
// controller.ts
import {injectable} from 'tsyringe';
import {Controller} from '@exlite/cls';

@injectable()
class ExampleController extends Controller {
  async exampleMethod(req: Request, res: Response) {
    res.send('Hello, World!');
  }
}

// Router configuration
app.get('/example', ExampleController.getMethod('exampleMethod'));
```

## `LocalController` Class

A base class for managing controllers without dependency injection. Ensures a single local instance per controller class.

#### Static Method **`getMethod(key: string): ReqHandler`**:

Retrieves and wraps a method from the controller for routing.

#### Usage:

```typescript
// controller.ts
import {LocalController} from '@exlite/cls';

class ExampleController extends LocalController {
  async exampleMethod(req: Request, res: Response) {
    res.send('Hello, World!');
  }
}

// Router configuration
app.get('/example', ExampleController.getMethod('exampleMethod'));
```

## **Choose Your Method** 🔀

You can use either `createController` or the static `Controller`/`LocalController` class-based methods, depending on your like:

1. Use `createController` for dynamic instances (with or without dependency injection).
2. Use `Controller` for static dependency-injected controllers.
3. Use `LocalController` for static, local-only controllers.

## **Examples** 🛠️

### **Dependency Injection with tsyringe**

```typescript
import {injectable} from 'tsyringe';
import {Controller} from '@exlite/cls';

@injectable()
class AuthController extends Controller {
  async login(req, res) {
    res.send({message: 'Logged in!'});
  }
}

app.post('/login', AuthController.getMethod('login'));
```

### **Using Local Controllers**

```typescript
import {LocalController} from '@exlite/cls';

class BlogController extends LocalController {
  async getPosts(req, res) {
    res.send({posts: []});
  }
}

app.get('/posts', BlogController.getMethod('getPosts'));
```

### **Dynamic Instance Creation**

```typescript
import {createController} from '@exlite/cls';

const auth = createController(AuthController);
app.post('/login', auth.getMethod('login'));
```

## **Conclusion** 🏁

`@exlite/cls` provides a robust and flexible way to manage controllers in Express.js. Whether you need dependency injection or prefer simpler local instances, this library has you covered. Streamline your application development today!

## Contributing 🤝

We welcome contributions to make `@exlite/cls` even better!

### How to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## Author ✍️

- **Aashish Panchal**
- GitHub: [@aashishpanchal](https://github.com/aashishpanchal)

## License 📜

[MIT © Aashish Panchal](LICENSE)
