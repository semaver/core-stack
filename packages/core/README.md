# @semaver/core

Core interfaces, types, and helper methods for object manipulation and reflection.

## Introduction

The `core` package is a collection of helper interfaces and classes designed to build frameworks with type safety. Its goal is to enhance readability and provide useful tools for other dependent projects.

## Installation

```bash
$ yarn add @semaver/core --peer
$ npm install @semaver/core --save-peer
```

> **Warning:** Please install the library as a **peer** dependency if possible.

## Table of Contents

- Types
  - JS Types
    - [JsFunction](#jsfunction)
    - [JsObject](#jsobject)
  - Utility Types
    - [EmptyGeneric](#emptygeneric)
    - [Nullable](#nullable)
    - [Undefined](#undefined)
    - [Empty](#empty)
    - [Throwable](#throwable)
  - Base Types
    - [IClass](#iclass)
    - [IFunction](#ifunction)
    - [IInterface](#iinterface)
    - [IType](#itype)
- Extensions
  - InterfaceSymbol
    - [For](#for)
  - Token
    - [token](#token)
  - CoreObject
    - [isObjectEmpty](#isobjectempty)
    - [isObjectPrimitive](#isobjectprimitive)
    - [isObjectClass](#isobjectclass)
    - [classOfObject](#classofobject)
    - [haveObjectsSameClass](#haveobjectssameclass)
    - [superClassOfObject](#superclassofobject)
    - [isNativeObjectClass](#isnativeobjectclass)
    - [getObjectSuperClassChain](#getobjectsuperclasschain)
  - CoreReflect
    - [hasOwnProperty](#hasownproperty)
    - [hasProperty](#hasproperty)
    - [getPropertyOwner](#getpropertyowner)
    - [getPropertyDescriptor](#getpropertydescriptor)
- Errors
  - ExtendedError
    - [throwDefault](#throwdefault)
    - [throwError](#throwerror)

------

## Types

### JS Types

#### JsFunction

```ts
type JsFunction = Function;
```

Represents the default JavaScript function type.

[Back to top](#table-of-contents)

#### JsObject

```ts
type JsObject = Object;
```

Represents the default JavaScript object type.

[Back to top](#table-of-contents)

### Utility Types

#### EmptyGeneric

```ts
interface EmptyGeneric<T> {};
```

Represents an empty generic object type.

[Back to top](#table-of-contents)

#### Nullable

```ts
type Nullable<T> = T | null;
```

Represents a generic object that can be `null`.

[Back to top](#table-of-contents)

#### Undefined

```ts
type Undefined<T> = T | undefined;
```

Represents a generic object that can be `undefined`.

[Back to top](#table-of-contents)

#### Empty

```ts
type Empty<T> = Nullable<T> | Undefined<T>;
```

Represents a generic object that can be `null` or `undefined`.

[Back to top](#table-of-contents)

#### Throwable

```ts
type Throwable<T> = T | never;
```

Represents a generic throwable object.

[Back to top](#table-of-contents)

### Base Types

Contains interfaces and types to ensure strong typing of objects.

#### IClass

```ts
interface IClass<T> extends JsFunction, EmptyGeneric<T> {};
```

A generic, newable class (constructor) type combining `JsFunction` and `EmptyGeneric<T>`; its `new(...args)` signature returns an instance of `T`.

[Back to top](#table-of-contents)

#### IFunction

```ts
type IFunction<TReturnType> = (...args: any[]) => TReturnType;
```

A generic function type that accepts any number of arguments and returns a specified type.

[Back to top](#table-of-contents)

#### IInterface

```ts
interface IInterface<T> extends EmptyGeneric<T> {
  readonly uid: symbol;
}
```

A generic interface type with a `uid` property of type `symbol`.

[Back to top](#table-of-contents)

#### IType

```ts
type IType<T> = IClass<T> | IInterface<T>;
```

A [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) combining `IClass<T>` and `IInterface<T>`.

[Back to top](#table-of-contents)

------

## Extensions

### InterfaceSymbol

```ts
class InterfaceSymbol<T> implements IInterface<T> {}
```

Helper class to "materialize" interfaces. Since JavaScript interfaces are just syntactic sugar, they cannot be used as types (e.g., passed as parameters). `InterfaceSymbol` turns any interface into a symbol that can be used as a typical type while maintaining TypeScript's strong typing.

#### For

```ts
static for<T>(uid: string | symbol): IInterface<T>;
```

A static method to create a symbol for a given interface, effectively "materializing" it. Symbols are pooled by identifier, so repeated calls with the same identifier return the same instance; a string identifier is resolved to a global symbol via `Symbol.for` before lookup. Throws if the identifier is `null` or `undefined`.

**Example:**

```ts
// To avoid TypeScript error: "refers to a type, but is being used as a value here."
export const ISomeInterface: IInterface<ISomeInterface> = InterfaceSymbol.for("ISomeInterface");

export interface ISomeInterface {
    // Interface definition
}

export class SomeInterfaceImpl implements ISomeInterface {
    // Implementation
}

// Usage in a container
container.bind(ISomeInterface).toClass(SomeInterfaceImpl);
```

[Back to top](#table-of-contents)

### Token

#### token

```ts
function token(): string;
```

Generates a process-unique, human-readable string identifier (e.g., `"kf3n2a-0"`, `"kf3n2a-1"`, ...). Each token is unique within a single running process and is intended for internal identity/versioning, compared only with strict equality. It is **not** cryptographic, **not** persisted, and its format is **not** a stable contract. (It replaced the previously used `uuid` dependency.)

[Back to top](#table-of-contents)

### CoreObject

A collection of helper functions for working with objects.

[Back to top](#table-of-contents)

#### isObjectEmpty

```ts
function isObjectEmpty(obj: unknown): boolean;
```

Checks if a given object is strictly `null` or `undefined`, returning `true` only in those two cases. Despite the name, this is not a general emptiness/falsiness check: other falsy values such as `0`, `""`, `false`, and `NaN` return `false`.

[Back to top](#table-of-contents)

#### isObjectPrimitive

```ts
function isObjectPrimitive(obj: unknown): boolean;
```

Checks if a given value is a primitive. Returns `true` for strings, numbers, booleans, symbols, and bigints, and also for `null` and `undefined` (they are not object references); returns `false` for objects, arrays, and functions.

[Back to top](#table-of-contents)

#### isObjectClass

```ts
function isObjectClass(obj: Nullable<object & { call?: JsFunction, apply?: JsFunction }>): boolean;
```

Checks if a given object is a class (constructor) rather than an instance, by testing that it is callable (has `constructor`, `call`, and `apply`). Returns `false` for `null`/`undefined` (handled safely — never throws) and for plain instances. Note: because the check is essentially "is this callable", ordinary functions also return `true`.

[Back to top](#table-of-contents)

#### classOfObject

```ts
function classOfObject<T extends object>(obj: IClass<T> | T): IClass<T>;
```

Returns the class of a given instance or the class itself.

[Back to top](#table-of-contents)

#### haveObjectsSameClass

```ts
function haveObjectsSameClass<A extends object, B extends object>(
  instanceA: Nullable<A>,
  instanceB: Nullable<B>
): boolean;
```

Returns `true` if two instances belong to the same class. Comparison is by strict reference equality of each value's `constructor`. Accepts `null`/`undefined` safely (never throws): returns `false` if either argument is `null` or `undefined`.

[Back to top](#table-of-contents)

#### superClassOfObject

```ts
function superClassOfObject<S extends object, C extends S>(
  childClass: Nullable<IClass<C>>,
  ignoreNativeObjectClass: boolean = false
): Nullable<IClass<S>>;
```

Returns the superclass (the class itself, resolved via the prototype chain) of a given class, or `undefined`. Expects a class, not an instance (it reads `childClass.prototype`). Returns `undefined` if `childClass` is `null`/`undefined`. The optional `ignoreNativeObjectClass` flag (default `false`) controls the top of the chain: when `true`, if the superclass is the native JavaScript `Object` class the function returns `undefined` instead of `Object`.

[Back to top](#table-of-contents)

#### isNativeObjectClass

```ts
function isNativeObjectClass<T extends object>(targetClass: Nullable<IClass<T>>): boolean;
```

Returns `true` if the class is the native JavaScript `Object` class, detected by checking that its prototype has no further prototype in the chain (i.e. it sits at the root of the prototype chain). Returns `false` for `null` or `undefined` input; never throws.

[Back to top](#table-of-contents)

#### getObjectSuperClassChain

```ts
function getObjectSuperClassChain(
  obj: Nullable<object>,
  reversed: boolean = false,
  excludeNativeObjectClass: boolean = true
): readonly IClass<object>[];
```

Returns the superclass chain of the object. Accepts either a class or an instance, and returns a readonly array. Returns an empty array for `null`/`undefined` input.

- If `reversed` is `false`, the chain starts from the child classes:
  - `ChildOfChildClass` -> `ChildClass` -> `ParentClass` -> **`Object`**
- If `reversed` is `true`, the chain starts from the parent class:
  - **`Object`** -> `ParentClass` -> `ChildClass` -> `ChildOfChildClass`
- If `excludeNativeObjectClass` is `true`, the **`Object`** class is excluded from the chain.

[Back to top](#table-of-contents)

### CoreReflect

A collection of helper functions for working with object reflection.

[Back to top](#table-of-contents)

#### hasOwnProperty

```ts
function hasOwnProperty(obj: Nullable<object>, property: PropertyKey): boolean;
```

Checks whether the object (class or instance) has an **own** (not inherited) property with the given key. Returns `false` — never throws — when the object is `null` or `undefined`; inherited/prototype properties also yield `false` (use `hasProperty` to include those). The key may be a string, number, or symbol.

[Back to top](#table-of-contents)

#### hasProperty

```ts
function hasProperty(obj: Nullable<object>, property: PropertyKey): boolean;
```

Checks whether the object (class or instance) has the property as an **own or inherited** property. Returns `false` when the object is `null`/`undefined` (never throws). Own properties are checked first, then the property is searched up the superclass prototype chain. Note: when the object is itself a class (constructor), only its own properties count — a property merely inherited by the class returns `false`.

[Back to top](#table-of-contents)

#### getPropertyOwner

```ts
function getPropertyOwner<S extends object, C extends S>(
  obj: Nullable<C>,
  property: PropertyKey
): Nullable<S>;
```

Returns the object or prototype that **owns** (declares) the property. Checks own properties first: if the object owns the property directly, the object itself is returned. Otherwise it walks the object's class prototype chain and returns the prototype on which the property is declared (the native `Object` class is excluded from the search). Returns `undefined` if the object is `null`/`undefined`, if the property is declared nowhere in the searched chain, or if the object is itself a class that does not own the property directly.

[Back to top](#table-of-contents)

#### getPropertyDescriptor

```ts
function getPropertyDescriptor(
  obj: Nullable<object>,
  property: PropertyKey
): Nullable<PropertyDescriptor>;
```

Returns the descriptor of a property, whether **own or inherited**, from the object or prototype that actually declares it — searching own properties first and then walking up the class/superclass prototype chain. Returns `undefined` if the property is not declared anywhere in the chain, if the object is `null`/`undefined`, or if the object is a class that does not own the property directly (inheritance is resolved for instances, not for class objects themselves).

[Back to top](#table-of-contents)

------

## Errors

### ExtendedError

```ts
class ExtendedError extends Error {
  constructor(target: object, error: string);
}
```

A base class for error handling that extends the native `Error`. The `target` parameter is the object where the error is thrown, and `error` is the description of the error. The resulting message has the form `[ClassName] error`, where `ClassName` is the class name of `target` (resolved via `classOfObject`).

[Back to top](#table-of-contents)

#### throwDefault

```ts
function throwDefault(target: object, error: string = "Error"): never;
```

Throws an `ExtendedError` (never returns). Builds the message as `[ClassName] error`, where `ClassName` is the class name of `target` and `error` is the description (defaults to `"Error"`). Use `target` to identify the object raising the error.

[Back to top](#table-of-contents)

#### throwError

```ts
function throwError(error: Error): never;
```

Throws the given `Error` instance as-is (no wrapping or message prefixing, unlike `throwDefault`). Its return type is `never`, so it never returns normally and can be used for control-flow/type narrowing.

[Back to top](#table-of-contents)
