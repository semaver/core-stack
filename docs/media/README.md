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

    - [Dictionaries](#dictionaries)
        - [IStringKeyDictionary](#istringkeydictionary)
        - [INumberKeyDictionary](#inumberkeydictionary)
        - [IDictionary](#idictionary)

- [Extensions](#extensions)
    - [InterfaceSymbol](#interfacesymbol)
        - [for](#for)
    - [CoreObject](#coreobject)
        - [isEmpty](#isempty)
        - [isPrimitive](#isprimitive)
        - [isClass](#isclass)
        - [classOf](#classof)
        - [haveSameClass](#havesameclass)
        - [superClassOf](#superclassof)
        - [isNativeObjectClass](#isnativeobjectclass)
        - [getSuperClassChain](#getsuperclasschain)
    - [CoreReflect](#corereflect)
        - [hasOwn](#hasown)
        - [has](#has)
        - [getOwner](#getowner)
        - [getDescriptor](#getdescriptor)
        -
- [Errors](#errors)
    - [CoreError](#coreerror)
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
JsObject = Object
```

Type for default javascript object.

[back](#table-of-contents)

### Utility Types

#### EmptyGeneric

```ts
type EmptyGeneric<T> = {};
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

Contains interfaces and mixed type to make objects strongly typed.

#### IClass<T>

```ts
interface IClass<T> extends JsFunction, EmptyGeneric<T>
```

Generic class type with prototype property of type `IPrototype<T>`.

[back](#table-of-contents)

#### IFunction<T>

```ts
type IFunction<TReturnType> = (...args: any[]) => TReturnType
```

Generic function type with any number of arguments and a returning type.

[back](#table-of-contents)

#### IInterface<T>

```ts
interface IInterface<T>
```

Generic interface type with read only property `uid` of type `symbol`.

[back](#table-of-contents)

#### IType<T>

```ts
type IType<T> = IClass<T> | IInterface<T>
```

[Union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) to mix `IClass<T>` and `IInterface<T>`. 

[back](#table-of-contents)

### Dictionaries

Key-value objects with understandable names.

#### IStringKeyDictionary

```ts
interface IStringKeyDictionary<TValueType>
```

Dictionary with string keys.

[back](#table-of-contents)

#### INumberKeyDictionary

```ts
interface INumberKeyDictionary<TValueType>
```

Dictionary with number keys.

[back](#table-of-contents)

#### IDictionary

```ts
type IDictionary<TValueType> = 
	IStringKeyDictionary<TValueType> | 
	INumberKeyDictionary<TValueType>
```

[Union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) for dictionary with string keys or
number keys.

[back](#table-of-contents)

## Extensions

#### InterfaceSymbol

```ts
class InterfaceSymbol<T> implements IInterface<T>
```

Helper to "materialize" interfaces. JS interfaces are just syntactic sugar, so can not be used as a type (e.g. send as a parameter in methods). InterfaceSymbol turns any interface into a symbol, so it can be used as a typical type anywhere, that at the same time is treated as IInterface by TS strong typization.

##### For

```ts
static for
<T>(uid: string | symbol): IInterface<T>
```

Static method to create a symbol for a given interface, that is used to "materialize" an interface.

Example:

```ts
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

```ts
class CoreObject 
```
Helper class for working with objects.

[back](#table-of-contents)

#### isEmpty

```ts
static isEmpty<T>(obj: T): boolean
```

Checks if given object is null or undefined.

[back](#table-of-contents)

#### isPrimitive

```ts
static isPrimitive<T>(obj: T): boolean
```

Checks if given object is primitive.

[back](#table-of-contents)

#### isClass

```ts
static isClass<T extends object>(obj: T): boolean
```

Checks if given object is class.

[back](#table-of-contents)

#### classOf

```ts
static classOf<T extends object >(obj: IClass<T> | T): IClass<T>
```

Returns class from the given instance or from class itself.

[back](#table-of-contents)

#### haveSameClass

```ts
static haveSameClass<A extends object, B extends object>(instanceA: A, instanceB: B): boolean
```

Returns true if two instances are of the same class.

[back](#table-of-contents)

#### superClassOf

```ts
static superClassOf<S extends object, C extends S>(
  childClass: IClass<C>, 
  ignoreNativeObjectClass: boolean = false
): Nullable<IClass<S>>
```

Returns super class of a given class. If `ignoreNativeObjectClass` is true and superclass is native
JavaScript `Object`, then returns `undefined`.

[back](#table-of-contents)

#### isNativeObjectClass

```ts
static isNativeObjectClass<T extends object>(targetClass: IClass<T>): boolean
```

Returns true if class is the native JavaScript `Object` class.

[back](#table-of-contents)

#### getSuperClassChain

```ts
static getSuperClassChain<S extends object, C extends S>(
    obj: C, 
    reversed: boolean = false, 
    excludeNativeObjectClass: boolean = true
): ReadonlyArray<IClass<S>>
```

Returns superclass chain of the object.

If `reversed` === `false`, then the chain starts from child classes:

`ChildOfChildClass` -> `ChildClass` -> `ParentClass` -> **`Object`** 

If `reversed` === `true`, then the chain starts from parent class:

**`Object`** -> `ParentClass` -> `ChildClass` -> `ChildOfChildClass`

If `excludeNativeObjectClass` === `true`, then **`Object`** class is excluded from chain.

[back](#table-of-contents)

### CoreReflect

```ts
class CoreReflect 
```
Helper class for object reflection.

[back](#table-of-contents)

#### hasOwn

```ts
static hasOwn<T extends object>(obj: T, property: PropertyKey): boolean
```

Checks if object (class or instance) has **own** property.

[back](#table-of-contents)

#### has

```ts
static has<T extends object>(obj: T, property: PropertyKey): boolean
```

Checks if object (class or instance) has **own or inherited** property.

[back](#table-of-contents)

#### getOwner

```ts
static getOwner<S extends object, C extends S>(obj: C, property: PropertyKey): Nullable<S>
```

Returns object (class or instance), that is the **owner** of the property.

[back](#table-of-contents)

#### getDescriptor

```ts
static getDescriptor<T extends object>(obj: T, property: PropertyKey): Nullable<PropertyDescriptor>
```

Returns a descriptor of the property. The property can be **own or inherited**.

[back](#table-of-contents)

## Errors

### CoreError

```ts
class CoreError extends Error
```

Base class for error handling.

[back](#table-of-contents)

#### throwDefault

```ts
static throwDefault<T>(target: T, error: string = "Error"): never
```

Throws default error, with minimal information.

[back](#table-of-contents)

#### throwError

```ts
static throwError<T extends Error>(error: T): never
```

Throws custom error.

[back](#table-of-contents)
