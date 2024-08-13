# @semaver/core

Core interface/types and helper methods.

## Introduction

The `core` package is a bundle of helper interfaces and classes to build the framework with type safety. The goal is to increase the readability and create some useful tools for other dependent projects.

## Installation

```
$ yarn add @semaver/core --peer
$ npm install @semaver/core  
```

> :warning: **Important!** Please, install the library as **peer** dependency if possible.

## Table Of Contents

- [Types](#types)
    - [JS Types](#js-types)
        - [JsFunction](#jsfunction)
        - [JsObject](#jsobject)
    - [Utility Types](#utility-types)
        - [EmptyGeneric](#emptygeneric)
        - [Nullable](#nullable)
        - [Throwable](#throwable)
    - [Base Types](#base-types)
        - [IClass](#iclass)
        - [IFunction](#ifunction)
        - [IInterface](#iinterface)
        - [IType](#itype)
- [Extensions](#extensions)
    - [InterfaceSymbol](#interfacesymbol)
        - [for](#for)
    - [CoreObject](#coreobject)
        - [isObjectEmpty](#isobjectempty)
        - [isObjectPrimitive](#isobjectprimitive)
        - [isObjectClass](#isobjectclass)
        - [classOfObject](#classofobject)
        - [haveSameClass](#havesameclass)
        - [superClassOfObject](#superclassofObject)
        - [isNativeObjectClass](#isnativeobjectclass)
        - [getObjectSuperClassChain](#getobjectsuperclasschain)
    - [CoreReflect](#corereflect)
        - [hasOwnProperty](#hasownproperty)
        - [hasProperty](#hasProperty)
        - [getPropertyOwner](#getpropertyowner)
        - [getPropertyDescriptor](#getpropertydescriptor)
        -
- [Errors](#errors)
    - [ExtendedError](#extendederror)
        - [throwDefault](#throwdefault)
        - [throwError](#throwerror)

## Types

### JS Types

#### JsFunction

```ts
type JsFunction = Function
```

Type for default javascript function.

[back](#table-of-contents)

#### JsObject

```ts
type JsObject = Object
```

Type for default javascript object.

[back](#table-of-contents)

### Utility Types

#### EmptyGeneric

```ts
interface EmptyGeneric<T>{};
```

Type for empty generic object.

[back](#table-of-contents)

#### Nullable

```ts
type Nullable<T> = T | null | undefined;
```

Type for generic object that can be null or undefined.

[back](#table-of-contents)

#### Throwable

```ts
type Throwable<T> = T | never
```

Type for generic throwable object.

[back](#table-of-contents)

### Base Types

Contains interfaces and mixed types to make objects strongly typed.

#### IClass

```ts
interface IClass<T> extends JsFunction, EmptyGeneric<T>
```

Generic class type with prototype property of type `IPrototype<T>`.

[back](#table-of-contents)

#### IFunction

```ts
type IFunction<TReturnType> = (...args: any[]) => TReturnType
```

Generic function type with any number of arguments and a returning type.

[back](#table-of-contents)

#### IInterface

```ts
interface IInterface<T> extends EmptyGeneric<T>{
  readonly uid: symbol;
}
```

Generic interface type with read only property `uid` of type `symbol`.

[back](#table-of-contents)

#### IType

```ts
type IType<T> = IClass<T> | IInterface<T>
```

[Union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) to mix `IClass<T>` and `IInterface<T>`. 

[back](#table-of-contents)

## Extensions

#### InterfaceSymbol

```ts
class InterfaceSymbol<T> implements IInterface<T>
```

Helper to "materialize" interfaces.
JS interfaces are just syntactic sugar, so cannot be used as a type (e.g., send as a parameter in methods).
InterfaceSymbol turns any interface into a symbol, so it can be used as a typical type anywhere,
that at the same time is treated as IInterface by TS strong typization.

##### For

```ts
static for<T>(uid: string | symbol): IInterface<T>
```

Static method to create a symbol for a given interface that is used to "materialize" an interface.

Example:

```ts
// to avoid Ts Error - "refers to a type, but is being used as a value here."
export const ISomeInterface: IInterface<ISomeInterface> =
    InterfaceSymbol.for("ISomeInterface");

export interface ISomeInterface {
    ...
}

export class SomeInterfaceImpl implements ISomeInterface {
...
}

...
container.bind(ISomeInterface).toClass(SomeInterfaceImpl);

```

[back](#table-of-contents)

### CoreObject

Collection of helpers to work with objects.

[back](#table-of-contents)

#### isObjectEmpty

```ts
function isObjectEmpty(obj: unknown): boolean
```

Checks if given object is null or undefined.

[back](#table-of-contents)

#### isObjectPrimitive

```ts
function isObjectPrimitive(obj: unknown): boolean
```

Checks if a given object is primitive.

[back](#table-of-contents)

#### isObjectClass

```ts
function isObjectClass(obj: Nullable<object & { call?: JsFunction, apply?: JsFunction }>): boolean
```

Check if a given object is class.

[back](#table-of-contents)

#### classOfObject

```ts
function classOfObject<T extends object >(obj: IClass<T> | T): IClass<T>
```

Returns class from the given instance or from class itself.

[back](#table-of-contents)

#### haveSameClass

```ts
function haveObjectsSameClass<A extends object, B extends object>(
	instanceA: Nullable<A>, 
	instanceB: Nullable<B>): boolean
```

Returns true if two instances are of the same class.

[back](#table-of-contents)

#### superClassOfObject

```ts
function superClassOfObject<S extends object, C extends S>(
  childClass: Nullable<IClass<C>>, 
  ignoreNativeObjectClass: boolean = false
): Nullable<IClass<S>>
```

Returns superclass of a given class.
If `ignoreNativeObjectClass` is true and superclass is native
JavaScript `Object`, then returns `undefined`.

[back](#table-of-contents)

#### isNativeObjectClass

```ts
function isNativeObjectClass<T extends object>(targetClass: Nullable<IClass<T>>): boolean
```

Returns true if class is the native JavaScript `Object` class.

[back](#table-of-contents)

#### getObjectSuperClassChain

```ts
function getObjectSuperClassChain(
    obj: Nullable<object>, 
    reversed: boolean = false, 
    excludeNativeObjectClass: boolean = true
): readonly IClass<object>[]
```

Returns superclass chain of the object.

If `reversed` === `false`, then the chain starts from child classes:

`ChildOfChildClass` -> `ChildClass` -> `ParentClass` -> **`Object`** 

If `reversed` === `true`, then the chain starts from parent class:

**`Object`** -> `ParentClass` -> `ChildClass` -> `ChildOfChildClass`

If `excludeNativeObjectClass` === `true`, then **`Object`** class is excluded from a chain.

[back](#table-of-contents)

### CoreReflect

Collection of helpers to work with object reflection.

[back](#table-of-contents)

#### hasOwnProperty

```ts
function hasOwnProperty(obj: Nullable<object>, property: PropertyKey): boolean
```

Checks if object (class or instance) has **own** property.

[back](#table-of-contents)

#### hasProperty

```ts
function hasProperty(obj: Nullable<object>, property: PropertyKey): boolean
```

Checks if object (class or instance) has **own or inherited** property.

[back](#table-of-contents)

#### getPropertyOwner

```ts
function getPropertyOwner<S extends object, C extends S>(
  obj: Nullable<C>, 
  property: PropertyKey): Nullable<S>
```

Returns object (class or instance), that is the **owner** of the property.

[back](#table-of-contents)

#### getPropertyDescriptor

```ts
function getPropertyDescripto(obj: Nullable<object>, property: PropertyKey): Nullable<PropertyDescriptor>
```

Returns a descriptor of the property. The property can be **own or inherited**.

[back](#table-of-contents)

## Errors

### ExtendedError

```ts
class ExtendedError extends Error
```

Base class for error handling.

[back](#table-of-contents)

#### throwDefault

```ts
function throwDefault(target: object, error: string = "Error"): never
```

Throws default error with minimal information.

[back](#table-of-contents)

#### throwError

```ts
function throwError(error: Error): never
```

Throws custom error.

[back](#table-of-contents)
