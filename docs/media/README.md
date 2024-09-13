# @semaver/core

Core interfaces, types, and helper methods for object manipulation and reflection.

## Introduction

The `core` package is a collection of helper interfaces and classes designed to build frameworks with type safety. Its goal is to enhance readability and provide useful tools for other dependent projects.

## Installation

```bash
$ yarn add @semaver/core --peer
$ npm install @semaver/core
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

Represents a generic object that can be  `undefined`.

#### Empty

```ts
type Undefined<T> = Nullable<T> | Undefined<T>;
```

Represents a generic object that can be  `null` or `undefined`.

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

A generic class type with a prototype property of type `IPrototype<T>`.

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

A static method to create a symbol for a given interface, effectively "materializing" it.

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

### CoreObject

A collection of helper functions for working with objects.

[Back to top](#table-of-contents)

#### isObjectEmpty

```ts
function isObjectEmpty(obj: unknown): boolean;
```

Checks if a given object is `null` or `undefined`.

[Back to top](#table-of-contents)

#### isObjectPrimitive

```ts
function isObjectPrimitive(obj: unknown): boolean;
```

Checks if a given object is a primitive type.

[Back to top](#table-of-contents)

#### isObjectClass

```ts
function isObjectClass(obj: Nullable<object & { call?: JsFunction, apply?: JsFunction }>): boolean;
```

Checks if a given object is a class.

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

Returns `true` if two instances belong to the same class.

[Back to top](#table-of-contents)

#### superClassOfObject

```ts
function superClassOfObject<S extends object, C extends S>(
  childClass: Nullable<IClass<C>>,
  ignoreNativeObjectClass: boolean = false
): Nullable<IClass<S>>;
```

Returns the superclass of a given class. If `ignoreNativeObjectClass` is `true` and the superclass is the native JavaScript `Object` class, it returns `undefined`.

[Back to top](#table-of-contents)

#### isNativeObjectClass

```ts
function isNativeObjectClass<T extends object>(targetClass: Nullable<IClass<T>>): boolean;
```

Returns `true` if the class is the native JavaScript `Object` class.

[Back to top](#table-of-contents)

#### getObjectSuperClassChain

```ts
function getObjectSuperClassChain(
  obj: Nullable<object>,
  reversed: boolean = false,
  excludeNativeObjectClass: boolean = true
): readonly IClass<object>[];
```

Returns the superclass chain of the object.

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

Checks if the object (class or instance) has its **own** property.

[Back to top](#table-of-contents)

#### hasProperty

```ts
function hasProperty(obj: Nullable<object>, property: PropertyKey): boolean;
```

Checks if the object (class or instance) has an **own or inherited** property.

[Back to top](#table-of-contents)

#### getPropertyOwner

```ts
function getPropertyOwner<S extends object, C extends S>(
  obj: Nullable<C>,
  property: PropertyKey
): Nullable<S>;
```

Returns the object (class or instance) that **owns** the property.

[Back to top](#table-of-contents)

#### getPropertyDescriptor

```ts
function getPropertyDescriptor(
  obj: Nullable<object>,
  property: PropertyKey
): Nullable<PropertyDescriptor>;
```

Returns the descriptor of a property, whether **own or inherited**.

[Back to top](#table-of-contents)

------

## Errors

### ExtendedError

```ts
class ExtendedError extends Error {}
```

A base class for error handling.

[Back to top](#table-of-contents)

#### throwDefault

```ts
function throwDefault(target: object, error: string = "Error"): never;
```

Throws a default error with minimal information.

[Back to top](#table-of-contents)

#### throwError

```ts
function throwError(error: Error): never;
```

Throws a custom error.

[Back to top](#table-of-contents)
