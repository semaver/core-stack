# @semaver/reflector
Reflection framework for TypeScript and JavaScript, with decorator inheritance support and no reflect-metadata dependency.

## About
**`reflector`** package does a full examination of TypeScript classes. It provides an extensive mechanism for querying and filtering detailed information about class structure. The package supports the reflection of decorated class members and parameters with the help of the built-in concept of [Annotation Decorators](#annotation-decorators). Annotation Decorators are the decoration mechanism for the code annotations in TypeScript. In other words, it provides the possibility to label different class members and parameters. **`reflector`** covers sophisticated cases of working with such decorators, like dynamic decoration on runtime and inheritance of decorated class members.

## Features 
* Acquiring detailed class information via annotated class members and parameters.
* Static and dynamic annotation (static: via @decorators; dynamic: on runtime, e.g., for third-party libs)
* Handling inheritance of annotated class members and parameters with the help of the [Decoration Policies](#decoration-policies).

## Requirements

To be able to use `@decorator()` syntax in **Typescript** it's required to configure `tsconfig.json` file.
However, it is possible to avoid this by using [dynamic decoration](#decorate-class-members-and-parameters-dynamically) (also works for **JavaScript** projects)


```json
{
    "compilerOptions": {
      ...
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true           
    }
}
```

> :warning: **Important!** Support for Typescript 5.x decorators will be available after the release of "decorated parameters"
>
>  [Link](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/) &rarr; "Differences with Experimental Legacy Decorators"

## Installation

```bash
$ yarn add @semaver/reflector --peer
$ npm install @semaver/reflector  
```

> :warning: **Important!** Please, pay attention that this package has a **peer dependency to `@semaver/core`** library.
>
> :warning: **Important!** Please, install the library as **peer** dependency if possible.

# Get Started
To get familiar with Reflector API, we will go through simple examples.

**Examples Setup**: We are trying to develop software that will automatically add getters & setters to the class properties. Let's have a look at how the **`reflector`** package and its built-in [Annotation Decorators](#annotation-decorators) can help us with it.

## Examples Setup Preparation
Since our sample software should add getters & setters to the class property,
let's define an example method that we can use for these purposes:

```ts
//Example function how to add accessors to the class property
function addAccessors<T extends object = object>(key: keyof T, obj: T): void {
  const privateKey: keyof T = "_" + key.toString() as keyof T;

  Object.defineProperty(obj, privateKey, {
    value: obj[key],
    writable: true
  });

  Object.defineProperty(obj, key, {
    get: () => {
      console.log("GET: " + key.toString());
      return obj[privateKey];
    },
    set: (value) => {
      console.log("SET: " + key.toString());
      obj[privateKey] = value;
    },
  });
}
```

To add accessors to the class, we need to define a couple of sample classes on which we will test our code:
```ts
class Shape {
    public x: number;
    public y: number;
    public color: string;

    public constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public draw(): void {
        console.log("Let's imagine that we are drawing smth here!");
    }
}

class Circle extends Shape{
    public radius: number;

    public constructor (x: number, y: number, color: string, radius: number) {
        super(x, y, color);
        this.radius = radius;
    }
}
```
To simplify our code and to show the whole power of the built-in [Annotation Decorators](#annotation-decorators) of the **`reflector`** package, we create an annotation decorator. It will be used to mark the properties that have to be updated with accessors.
```ts
import {
    Decorator,
    DecoratorFn
} from "@semaver/reflector";

function accessors(): DecoratorFn {
    return Decorator.build(new AccessorsDecorator());
}

class AccessorsDecorator extends Decorator {
}
```
The final preparation step is to annotate our sample class properties with the `@accessors` annotation decorator:

```ts
import {accessors} from "../decorators/AccessorsDecorator";

class Shape {
  @accessors()
  public x: number;

  @accessors()
  public y: number;

  @accessors()
  public color: string;

  public constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  public draw(): void {
    console.log("Let's imagine that we are drawing smth here!");
    }
}
```
Now, we are all set to explore the Reflector possibilities!

## Example 1: How to get class members with Reflector API
To apply our logic of adding accessors to the property, we can use Reflector API.
It will get us the properties from the class.
We can do that in many ways:
1. via the property name one by one;
2. as a group of all annotated class properties;
3. via the Reflector Query API to get an array of the all annotated class properties.

### Example 1.1 Get Property By Name
> :information_source: More information on Reflector API and how to get other class members and parameters can be found here: [Get Class Members and Parameters](#get-class-members-and-parameters)

```ts
import {Property, Reflector} from "@semaver/reflector";

//Create Reflector instance
const shapeReflector: Reflector<Shape> = Reflector.from(Shape);

//Get property by name
const xProperty: Property = shapeReflector.getProperty("x", false);

// Method to add accessors to the property, example implementation can be found in Examples Setup Preparation
addAccessors(xProperty.getName() as keyof object, Shape.prototype);

//Check if setter & getter are executed
const myShape : Shape = new Shape(3,4, "red"); //CONSOLE: SET x
console.log(myShape.x); // CONSOLE: GET: x; 3
```
### Example 1.2: Get Annotated Properties
> :information_source: Detailed information on how to create and use Annotation Decorators can be found here: [Annotation Decorators](#annotation-decorators)

```ts
import {Reflector} from "@semaver/reflector";

//Create Reflector instance
const shapeReflector: Reflector = Reflector.from(Shape);

//Get all decorated properties
shapeReflector.getDecoratedProperties().forEach(prop => {
  // Method to add accessors to the property, example implementation can be found in Examples Setup Preparation
  addAccessors(prop.getName() as keyof object, Shape.prototype);
});

//Check if setter & getter are executed
const myShape: Shape = new Shape(3, 4, "red"); //CONSOLE: SET x; SET y; SET color
console.log(myShape.x); // CONSOLE: GET: x; 3
```

### Example 1.3: Get Property By Query
> :information_source: More information on Reflector API and how to query annotated class members and parameters can be found here: [Query Class Members and Parameters](#query-class-members-and-parameters)

```ts
import {
    ByMemberType,
    ClassMember,
    DecoratedElementType,
    QueryExecutor,
    Reflector
} from "@semaver/reflector";

//Create Reflector instance
const shapeReflector: Reflector<Shape> = Reflector.from(Shape);

//Create query instance
const query: QueryExecutor<Shape> = shapeReflector.query();

//Filter query to get all properties (get all class members that have "PROPERTY" type)
const byMemberTypeQuery: QueryExecutor<Shape> = query.filter(ByMemberType.from(DecoratedElementType.PROPERTY));

//Get the result from the query as an array of properties
const members: ClassMember[] = byMemberTypeQuery.members().all<ClassMember<Shape>>();

//Method to add accessors to the property, example implementation can be found in Examples Setup Preparation
members.forEach(prop => addAccessors(prop.getName() as keyof object, Shape.prototype));

//Check if setter & getter are executed
const myShape : Shape = new Shape(3,4, "red"); //CONSOLE: SET x; SET y; SET color
console.log(myShape.x); // CONSOLE: GET: x; 3
```
## Example 2: How to work with annotation decorator policies
[Annotation Decorators](#annotation-decorators) unlock the power of [Decoration Policies](#decoration-policies), which we will investigate in this and further examples. 

> :information_source: Detailed information on all available Decoration Policies and their properties can be found here: [Decoration Policies](#decoration-policies)

We agreed to add accessors to the class properties. So we can limit our `@accessors` annotation to the class properties only. This can be done with the help of [Access Policy](#access-policy), which we need to configure for the annotation decorator:

```ts
import {
    Decorator,
    DecoratorFn,
    MetadataAccessPolicy,
} from "@semaver/reflector";

function accessors(): DecoratorFn {
    return Decorator.build(new AccessorsDecorator());
}

class AccessorsDecorator extends Decorator {
  //Add Access Policy and configure it to make annotation available to class properties only
    public getAccessPolicy(): MetadataAccessPolicy {
        return MetadataAccessPolicy.PROPERTY;
    }
}
```
Now we add the `@accessors` annotation to the Shape class properties and draw() method to make sure that `@accessors` will be just ignored on everything that is not a class property:

```ts
class Shape {
  @accessors()
  public x: number;

  @accessors()
  public y: number;

  @accessors()
  public color: string;

  public constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  //Access Policy does not allow this annotation, so will be just ignored
  @accessors()
    public draw(): void {
        console.log("Let's imagine that we are drawing smth here!");
    }
}
```
So let's check that Reflector will see 3 annotated Shape class properties but won't find any annotated method:
```ts
import {reflector} from "@semaver/reflector";

//Create Reflector instance
const shapeReflector: Reflector<Shape> = Reflector.from(Shape);

//Check that Reflector sees 3 decorated properties
console.log(shapeReflector.getDecoratedProperties()); // CONSOLE: [Property, Property, Property]

//Check that Reflector sees any decorated methods
console.log(shapeReflector.getDecoratedMethods()); // CONSOLE: []
```
## Example 3: How to work with annotation decorator inheritance
As classes in TS support inheritance, [Annotation Decorators](#annotation-decorators) support it as well for the same class member and parameter. It is regulated via Inheritance [Decoration Policies](#decoration-policies): [Collision Policy](#collision-policy), [Not-Existence Policy](#not-existence-policy), [Appearance Policy](#appearance-policy).

We will see how it works on the example of [Not-Existence Policy](#not-existence-policy).
It defines the behavior of the decorator if it does **NOT EXIST** in the child class,
but **EXISTS** in its direct parent class for the same class member or argument.

[Not-Existence Policy](#not-existence-policy) has 2 values:
  * `SKIP` - decorator from the direct parent class is **not used** for the child class;
  * `APPLY` - decorator from the direct parent class is **used** for the child class.

 In our original example: Shape class is a parent class and Circle is a child class. We assume that we want Circle class to also have inherited properties annotated, so the [Not-Existence Policy](#not-existence-policy) should be set to `APPLY`. 
 To make this happen, we need to add it to the `@accessors` annotation decorator:
 ```ts
import {
    Decorator,
    DecoratorFn,
    MetadataAccessPolicy,
    MetadataNotExistencePolicy,
    PrimitiveMetadataAccessPolicy
} from "@semaver/reflector";

function accessors(): DecoratorFn {
    return Decorator.build(new AccessorsDecorator());
}

class AccessorsDecorator extends Decorator {
    public getAccessPolicy(): MetadataAccessPolicy {
        return MetadataAccessPolicy.PROPERTY;
    }

    // Add Not-Existence Policy to enforce the inheritance of the annotations for inherited properties
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy): MetadataNotExistencePolicy {
        return MetadataNotExistencePolicy.APPLY;
    }
}
 ```
 > :information_source: [Not-Existence Policy](#not-existence-policy): `APPLY` is actually the default value for this policy. So there is no need to redefine it again in AccessorsDecorator class, because it will be default behavior anyway. But we are doing it in this example for better visibility and understanding.

 Now we can check that even without setting anything explicitly in the Circle class, Reflector can see inherited properties as annotated, so we can get them and apply our update with accessors logic:

 ```ts
import {Reflector} from "@semaver/reflector";

//Create Reflector instance
const circleReflector: Reflector<Circle> = Reflector.from(Circle);

//Get decorated properties in Circle via Not-Existence Policy
circleReflector.getDecoratedProperties().forEach(prop => {
  // Method to add accessors to the property, example implementation can be found in Examples Setup Preparation
  addAccessors(prop.getName() as keyof object, Circle.prototype);
});

//Check if setter & getter are executed
const myCircle: Circle = new Circle(3, 4, "red", 5);//CONSOLE: SET x; SET y; SET color
console.log(myCircle.x);// CONSOLE: GET: x; 3
 ```

## Example 4: How to get all annotated properties in all classes
As a final step, we need to make our approach to update class properties with accessors as general as possible,
so it will be good not to rely on concrete classes and property names. 
**`reflector`** package gives us such possibility.
It has centralized storage for the decorated classes (classes that contain decorated members and parameters),
called ClassTable.

> :information_source: Detailed information on ClassTable and how to get all decorated classes can be found here: [Get All Decorated Classes](#get-all-decorated-classes)

We can see how it works in our Shape-Circle example. We need to add the `@accessors` annotation to the `Circle.radius` property, to cover all existing properties:

```ts
class Circle extends Shape {
  @accessors()
  public radius: number;

  public constructor(x: number, y: number, color: string, radius: number) {
    super(x, y, color);
    this.radius = radius;
  }
}
```
Now we can check how all properties in both classes will be seen by Reflector, and we can update them with accessors:

```ts
import {Reflector} from "@semaver/reflector";

// Reflect has direct access to the ClassTable from where it can get all decorated classes
Reflector.getClassTable().getClasses().forEach(cls => {

  //Create Reflector instance
  const reflector: Reflector = Reflector.from(cls);

  //Get all decorated properties from the class
  reflector.getDecoratedProperties().forEach(prop => {
    // Method to add accessors to the property, example implementation can be found in Examples Setup Preparation
    addAccessors(prop.getName() as keyof object, cls.prototype);
  });
});

//Check if setter & getter are executed
const myShape: Shape = new Shape(3, 4, "red");//CONSOLE: SET x; SET y; SET color
console.log(myShape.x);// CONSOLE: GET: x; 3

const myCircle: Circle = new Circle(3, 4, "red", 5);//CONSOLE: SET x; SET y; SET color; SET: radius
console.log(myCircle.radius);// CONSOLE: GET: radius; 5
```

## Example 5: How to annotate class dynamically
In the previous examples, we were working with statically annotated classes.
The Reflector API gives us the possibility to annotate class members and parameters dynamically during run-time
(e.g., for some library class).

> :information_source: Detailed information on dynamic class annotation can be found here: [Decorate Class Members & Parameters Dynamically](#decorate-class-members-and-parameters-dynamically)

Let's try it on our basic sample class `Shape` without any static annotations:

```ts
class Shape {
    public x: number;
    public y: number;
    public color: string;

    public constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public draw(): void {
        console.log("Let's imagine that we are drawing smth here!");
    }
}
```

To do this, we only need to call the `addDecorator()` method of the Reflector with the annotation decorator method `accessors()` as a parameter:

 ```ts
import {Reflector} from "@semaver/reflector";

//Create Reflector instance
const shapeReflector: Reflector<Shape> = Reflector.from(Shape);

shapeReflector.getProperty("x").addDecorator(accessors());
shapeReflector.getProperty("y").addDecorator(accessors());
shapeReflector.getAccessor("color").addDecorator(accessors());
 ```

# Reflector Documentation

- [Reflector API](#reflector-api)
    - [Reflected Types](#reflected-types)
    - [Get Class Members and Parameters](#get-class-members-and-parameters)
    - [Query Class Members and Parameters](#query-class-members-and-parameters)
    - [Filter Class Members and Parameters](#filter-class-members-and-parameters)
        - [Custom Filters](#custom-filters)
    - [Decorate Class Members & Parameters Dynamically](#decorate-class-members-and-parameters-dynamically)
  - [Get All Decorated Classes](#get-all-decorated-classes)
- [Annotation Decorators](#annotation-decorators)
  - [Create Annotation Decorators](#create-annotation-decorators)
    - [STEP 1: Define Decorator Function](#step-1-define-decorator-function)
    - [STEP 2: Define Decorator Class](#step-2-define-decorator-class)
    - [[OPTIONAL] STEP 3: Define Decoration Policies](#optional-step-3-define-decoration-policies)
    - [[OPTIONAL] STEP 4: Define Decorator Parameters](#optional-step-4-define-decorator-parameters)
  - [Use Annotation Decorators](#use-annotation-decorators)
  - [Decoration Policies](#decoration-policies)
    - [Access Policy](#access-policy)
    - [Same-Target-Multi-Usage Policy](#same-target-multi-usage-policy)
    - [Collision Policy](#collision-policy)
    - [Not-Existence Policy](#not-existence-policy)
    - [Appearance Policy](#appearance-policy)
- [Architectural Notes](#architectural-notes)
  - [Reflected Types Architecture](#reflected-types-architecture)
  - [Behind the Scene of Annotation Decorators](#behind-the-scene-of-annotation-decorators)
  - [Annotation Decorators Usage for Constructor Parameters](#annotation-decorators-usage-for-constructor-parameters)

## Reflector API
The main goal of the reflection is to provide information about class structure. The **`reflector`** package gives you the possibility to access class members and parameters directly by name or query annotated structural items by some condition. The annotations **HAVE TO** be built on the [Annotation Decorators](#annotation-decorators) mechanism, that is provided by this package, otherwise class members and parameters won't be visible to the Reflector.

> :information_source: [Annotation Decorators](#annotation-decorators) is the decoration mechanism for the code annotations in TypeScript. It provides the possibility to label different class members and parameters. How to create and use annotation decorators can be found here: [Annotation Decorators](#annotation-decorators)

To get access to the Reflector API, the Reflector object has to be created. It can be done in 2 ways:

- with reflected class type;
- with reflected class instance.

```ts
const someReflector1: Reflector = Reflector.from(SomeClass);
// or
const instance: SomeClass = new SomeClass();
const someReflector2: Reflector = Reflector.from(instance);
```
> :information_source: Method `from()` takes 2 parameters: 1. class type/instance 2. `autoSync` parameter(boolean: true/false). The `autoSync` parameter is used for the dynamic decoration. Its default value is false, which means that the Reflector will ignore dynamically added/removed decorators. When `autoSync` is set to true, it will make the Reflector automatically synchronize its state and see all changes that are made by dynamic decoration. More details on dynamic decoration can be found at [Decorate Class Members & Parameters Dynamically](#decorate-class-members-and-parameters-dynamically).


### Reflected Types

There are four class member types and one parameter type that Reflector can acquire:

```ts
enum ClassMemberType {
    CONSTRUCTOR = "CONSTRUCTOR",
    PROPERTY = "PROPERTY",
    ACCESSOR = "ACCESSOR",
    METHOD = "METHOD",
}

enum ParameterType {
    PARAMETER = "PARAMETER",
}
```
The reflected type is a wrapper class under the relevant language construction, that helps to properly encapsulate necessary information about the requested class member or parameter. 

> :information_source: More details on reflected types can be found at [Reflected Types Architecture](#reflected-types-architecture).

[back](#reflector-documentation)

### Get Class Members and Parameters

To retrieve necessary information from the class, you need to create a Reflector instance for this class and call the relevant API method. In the case of a decorated class member or parameter, the Reflector will return additional information about applied decorators.

> :warning: **Important!** If you want to get a class member or parameter by **name**, please beware of the obfuscation/minification level. During such procedures, the names can be changed. It will make a reflection of such class members or parameters not possible because the requested code won't be found.


```ts
const reflector: Reflector = Reflector.from(SomeClass);

//---CONSTRUCTOR---------------------------------------------------------------------------

// returns constructor of a class (decorated or not)
const baseConstructor: Constructor<SomeClass> = reflector.getConstructor();

//---METHOD---------------------------------------------------------------------------------

// BEWARE OF OBFUSCATION/MINIFICATION LEVEL
// returns instance/static method by name (decorated or not) or else undefined
const methodName: string = 'myMethod';
const isMethodStatic: string = false;
const someMethod: Method<SomeClass> = reflector.getMethod(methodName, isMethodStatic);

//---FIELD (UNION OF ACCESSOR & PROPERTY)----------------------------------------------------

// BEWARE OF OBFUSCATION/MINIFICATION LEVEL
// returns instance/static field by name (decorated or not) or else undefined
const fieldName: string = 'myField';
const isFieldStatic: string = false;
const someField: Field<SomeClass> = reflector.getField(fieldName, isFieldStatic);

//---ACCESSOR--------------------------------------------------------------------------------

// BEWARE OF OBFUSCATION/MINIFICATION LEVEL
// returns instance/static accessor by name (decorated or not) or else undefined
const accessorName: string = 'myAccessor';
const isAccessorStatic: string = false;
const someAccessor: Accessor<SomeClass> = 
      reflector.getAccessor(accessorName, isAccessorStatic);

//---PROPERTY--------------------------------------------------------------------------------

// BEWARE OF OBFUSCATION/MINIFICATION LEVEL
// returns instance/static property by name (decorated or not) or else undefined
const propertyName: string = 'myProperty';
const isPropertyStatic: string = false;
const someProperty: Property<SomeClass> = 
      reflector.getProperty(propertyName, isPropertyStatic);
```

To ease the work with class annotation decorators, additional decorator-specific methods are provided:
```ts
const reflector: Reflector = Reflector.from(SomeClass);

//---ADDITIONAL ANNOTATION DECORATOR-SPESIFIC METHODS------------------------------------------------------

// if constructor or any parameters of the constructor are decorated,
// returns constructor or else undefined
const decoratedConstructor: Constructor<SomeClass> = reflector.getDecoratedConstructor();

// returns all decorated methods or else empty array
const methods: ReadonlyArray<Method<SomeClass>> = reflector.getDecoratedMethods();

// returns all decorated fields (accessors and properties) or else empty array
const fields: ReadonlyArray<Field<SomeClass>> = reflector.getDecoratedFields();

// returns all decorated accessors or else empty array
const accessors: ReadonlyArray<Accessor<SomeClass>> = reflector.getDecoratedAccessors();

// returns all decorated properies or else empty array
const properies: ReadonlyArray<Property<SomeClass>> = reflector.getDecoratedProperties();

// returns all decorated constructor, methods, accessors, fields or else empty array
const members: ReadonlyArray<ClassMember<SomeClass>> = reflector.getDecoratedMembers();
```
[back](#reflector-documentation)

### Query Class Members and Parameters
You can get different class members and parameters with the help of the Query API. But the **`reflector`** queries work only with annotated via [Annotation Decorators](#annotation-decorators) class elements. Non-annotated elements will not be visible to the query mechanism.

> :information_source: How to create and use annotation decorators can be found here: [Annotation Decorators](#annotation-decorators)

```ts  
// returns query executor from class info
const query: QueryExecutor<MyClass> = Reflector.from(MyClass).query();

//---CLASS MEMBERS---------------------------------------------------------------------------

// returns member selector from query
const memberSelector: QueryMembersSelector<MyClass> = query.members();

// returns class members from member selector
const members: ClassMember[] = membersSelector.all<ClassMember>()

// returns first class member from member selector
const firstFoundMember: ClassMember = membersSelector.first<ClassMember>()

```

There is also an additional Query API for the annotation decorators. Since [Annotation Decorators](#annotation-decorators) support inheritance of the decorated members and parameters, we differentiate between the decorators that will be actually executed and the class's own decorators that were explicitly assigned to exactly this class member or parameter. The actual execution might be influenced by the inheritance of the decorators and [Decoration Policies](#decoration-policies) (if they are defined).

> :information_source: Detailed information on decoration policies and their parameters can be found here: [Decoration Policies](#decoration-policies)

```ts  
//---CLASS MEMBER & PARAMETER ANNOTATION DECORATORS----------------------------------------------------

// returns all decorators from query (incl. decoration inheritance & acc. to decoration policies)
const decoratorSelector: QueryDecoratorSelector<MyClass> = query.decorators();

// returns all decorators from query (that belongs to this class only : no inheritance, no decoration policies applied)
const ownDecorators: QueryDecoratorSelector<MyClass> = query.ownDecorators();

// returns member and parameter decorators from decorator selector
const decorators: Decorator[] = decoratorSelector.all()

// returns class member decorators from decorator selector
const memberDecorators: Decorator[] = decoratorSelector.ofMembers()

// returns class parameter decorators from decorator selector
const parameterDecorators: Decorator[] = decoratorSelector.ofParameters()

```
[back](#reflector-documentation)

### Filter Class Members and Parameters
You can filter class members and parameters based on available filtering conditions:
- `ByMemberName` - to filter class members by name;
- `ByMemberType` - to filter class members by type (CONSTRUCTOR, METHOD, PROPERTY, ACCESSOR);
- `ByStaticMember` - to filter class members by static/non-static;
- `ByDecoratorClass` - to filter class members by annotation decorator class (class member decorator or parameter decorator);
- `ByMemberDecoratorClass` - to filter class members by class member annotation decorator class
- `ByParameterDecoratorClass` - to filter class members by parameter annotation decorator class

Filtering is based on the query mechanism, that is described in [Query Class Members and Parameters](#query-class-members-and-parameters).
To access filtered values, please refer to the Query API.

> :warning: **Important!** If you want to get a class member or parameter by **name**, please beware of the obfuscation/minification level. During such procedures, the names can be changed. It will make a reflection of such class members or parameters not possible because the requested code won't be found.

```ts  
// returns query executor from class info
const query: QueryExecutor<MyClass> = Reflector.from(MyClass).query();

//---FILTER BY NAME-------------------------------------------------------------------------
// BEWARE OF OBFUSCATION/MINIFICATION LEVEL
const memberName: string = "someClassMemberName";
const byMemberNameQuery: QueryExecutor<MyClass> = 
      query.filter(ByMemberName.from(memberName));

//---FILTER BY MEMBER TYPE------------------------------------------------------------------
const memberType: DecoratedElementType = DecoratedElementType.METHOD;
const byMemberTypeQuery: QueryExecutor<MyClass> =
        query.filter(ByMemberType.from(memberType));

//---FILTER BY STATIC/NONSTATIC MEMBER------------------------------------------------------
const isMemberStatic: boolean = false;
const byMemberStaticQuery: QueryExecutor<MyClass> =
        query.filter(ByStaticMember.from(isMemberStatic));


//---FILTER BY ANNOTATION DECORATOR (3 Examples)
const decoratorClass: IClass<AnnotationDecorator> = AnnotationDecorator;

//---1. FILTER BY ANNOTATION DECORATOR FOR CLASS MEMBERS & PARAMETERS-------------------------------------
const byDecoratorClassQuery: QueryExecutor<MyClass> =
        query.filter(ByDecoratorClass.from(decoratorClass));

//---2. FILTER BY ANNOTATION DECORATOR FOR PARAMETRS ONLY-------------------------------------------------
const byParameterDecoratorClassClassQuery: QueryExecutor<MyClass> =
        query.filter(ByParameterDecoratorClass.from(decoratorClass));

//---3. FILTER BY ANNOTATION DECORATOR FOR CLASS MEMBERS ONLY---------------------------------------------
const byMemberDecoratorClassQuery: QueryExecutor<MyClass> =
        query.filter(ByMemberDecoratorClass.from(decoratorClass));

```
[back](#reflector-documentation)

#### Custom Filters
It is possible to combine/chain different filtering conditions or create your conditions
by implementing [IQueryCondition](https://github.com/semaver/split-ts/blob/master/packages/reflector/src/com/split/reflector/query/IQueryCondition.ts) interface.
The examples can be found in already existing filters:
  - [Filter By Member Type](https://github.com/semaver/split-ts/blob/master/packages/reflector/src/com/split/reflector/query/conditions/members/ByMemberType.ts);
  - [Filter By Member Name](https://github.com/semaver/split-ts/blob/master/packages/reflector/src/com/split/reflector/query/conditions/members/ByMemberName.ts)

[back](#reflector-documentation)

### Decorate Class Members and Parameters Dynamically
If you need to add/remove decorators dynamically on runtime, the **`reflector`** package with its [Annotation Decorators](#annotation-decorators) can provide that.
Based on [Reflected Types Architecture](#reflected-types-architecture), each [Reflected Type](#reflected-types) are the child of `DecoratedElement<T>` class and inherits 2 methods:
  * ` addDecorator(decoratorOrFn: Decorator | DecoratorFn): boolean` - for adding decorators on runtime
    - `decoratorOrFn` - decorator function
  * `removeDecorator(decoratorOrClass: IClass<Decorator> | Decorator): boolean` - for deleting decorators on runtime
    - `decoratorOrClass` - decorator class

Let's assume we have defined annotation decorator:

> :information_source: Detailed information on how to create annotation decorators can be found here: [Annotation Decorators](#annotation-decorators)

```ts
import {Decorator} from "@semaver/reflector";

export function annotation(): DecoratorFn {
    return Decorator.build(new AnnotationDecorator());
}

export class AnnotationDecorator extends Decorator {
}
```
It is important to note that when decorators are added/removed dynamically, the Reflector has to be refreshed. There are two approaches to do that.

1. Set the `autoSync` parameter to true when the Reflector is created. It will make the Reflector to update each time when the Reflector API is called, so it will help to keep the Reflector always up to date automatically. The default value of `autoSync` is false: the Reflector does not update automatically.
```ts
const reflector: Reflector<MyClass> = Reflector.from(MyClass, true); //autoSync is true, the Reflector will be updated automatically
```

2. As mentioned before, by default `autoSync` is set to false, so the Reflector won't see added/removed decorator. To change that the Reflector has to be explicitly updated via the `refresh()` method.

```ts
const reflector: Reflector<MyClass> = Reflector.from(MyClass); //autoSync is false, the Reflector will NOT be updated automatically
//SAME AS
const reflector: Reflector<MyClass> = Reflector.from(MyClass, false); //autoSync is false, the Reflector will NOT be updated automatically

reflector.getConstructor().addDecorator(annotation()); //added decorator 'annotation()' is not visible to the Reflector

reflector.refresh(); //explicit update makes newly added decorator visible to the Reflector
```

**The Complete Reflector API for Dynamic Decoration:**

```ts
const reflector: Reflector<MyClass> = Reflector.from(MyClass);

//---CONSTRUCTOR---------------------------------------------------------------------------
reflector.getConstructor().addDecorator(annotation());
// OR
reflector.getConstructor().addDecorator(Decorator.build(new AnnotationDecorator()));
reflector.getConstructor().removeDecorator(AnnotationDecorator);

//---CONSTRUCTOR PARAMETERS-----------------------------------------------------------------
reflector.getDecoratedConstructor().getParameterAt(0).addDecorator(annotation());
reflector.getDecoratedConstructor().getParameterAt(0).removeDecorator(AnnotationDecorator);

//---FIELD (UNION OF ACCESSOR & PROPERTY)---------------------------------------------------
// true - for instance class member, false - for static class members
reflector.getField(memberName, true).addDecorator(annotation());
reflector.getField(memberName, true).removeDecorator(AnnotationDecorator);

//---ACCESSOR-------------------------------------------------------------------------------
// true - for instance class member, false - for static class members
reflector.getAccessor(memberName, true).addDecorator(annotation());
reflector.getAccessor(memberName, true).removeDecorator(AnnotationDecorator);

//---PROPERTY-------------------------------------------------------------------------------
// true - for instance class member, false - for static class members
reflector.getProperty(memberName, true).addDecorator(annotation());
reflector.getProperty(memberName, true).removeDecorator(AnnotationDecorator);

//---METHOD---------------------------------------------------------------------------------
reflector.getMethod(memberName, true).addDecorator(annotation());
reflector.getMethod(memberName, true).removeDecorator(AnnotationDecorator);

//---METHOD PARAMETERS-----------------------------------------------------------------------
reflector.getMethod(memberName, true).getParameterAt(0).addDecorator(annotation());
reflector.getMethod(memberName, true).getParameterAt(0).removeDecorator(AnnotationDecorator);

reflector.refresh();

```
[back](#reflector-documentation)

###  Get All Decorated Classes
**`reflector`** stores information about decorated classes (with [Annotation Decorators](#annotation-decorators)) in a special centralized storage, called **ClassTable**. It is possible to retrieve decorated classes from ClassTable.

> :warning: ClassTable contains only classes that have their **OWN** decorators (**NOT** decorators assigned to the class via decorators' inheritance & [Decoration Policies](#decoration-policies)). However, it is possible to add such a class to ClassTable by applying annotation decorator `@reflect()` on this class.

To retrieve decorated classes from the ClassTable:
```ts
const classTable: IClassTable = Reflector.getClassTable();
```

**ClassTable has next API:**
```ts
export interface IClassTable {

    getClasses(): ReadonlySet<IMetadataClass<unknown>>;
    
    getSyncHash(): string;

    subscribe(...subscribers: IClassTableSubscriber[]): this

    unsubscribe(...subscribers: IClassTableSubscriber[]): this
}
```

`getClasses` - provides a set of all decorated classes.

`getSyncHash` - detects if ClassTable was changed (hash is recalculated on each ClassTable modification).

`subscribe/unsubscribe` - detects ClassTable modification: the subscriber can get detailed information on what exactly was modified.

**ClassTable Subscription has next API:**
```ts
export interface IClassTableSubscriber {
  onClassTableUpdate(update: IClassTableUpdate): void;
}
```

```ts
export interface IClassTableUpdate<TDecorator extends Decorator = Decorator, T = unknown> {

  readonly type: ClassTableUpdateTypes; // enum: { METADATA_ADDED, METADATA_REMOVED }

  readonly decorator: TDecorator;

  readonly targetClass: IClass<T>;

  readonly decoratedElement: {

    readonly type: DecoratedElementType;

    readonly name: string;

    readonly isStatic: boolean;

    readonly parameterIndex: number;
  };
};
```
`type` - type of update: if metadata/decorator was added or removed.

`decorator` - decorator object itself.

`targetClass` - class with modified decorators.

`decoratedElement` - info about the decorated element:

  * `type` - class member type (Constructor, Method, Parameters… etc.).

  * `name` - class member name.

  * `isStatic` - if a class member is static or not.

  * `parameterIndex` - in case of parameter - parameter index


[back](#reflector-documentation)


## Annotation Decorators
[Annotation Decorators](#annotation-decorators) is the decoration mechanism for the code annotations in TypeScript, that is provided by the **`reflector`** package. It gives the possibility to label different class members and parameters. The **`reflector`** package uses them to query class structure. Below you can find information on how to create and use annotation decorators to make them available for the Reflector.

If you want to get additional information on how the Reflector retrieves information about annotation decorators, please refer to **Architectural Notes: [Behind the Scene of Annotation Decorators](#behind-the-scene-of-annotation-decorators)**.

[back](#reflector-documentation)

### Create Annotation Decorators
You can define an annotation decorator in the next 4 steps.

[back](#reflector-documentation)

#### STEP 1: Define Decorator Function
As with [Type Script decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), you need to define the decorator function. But the decorator function has to contain a call: `Decorator.build()`, that expects an annotation decorator class of [Decorator](https://github.com/semaver/split-ts/blob/master/packages/reflector/src/com/split/decorators/Decorator.ts) type as parameter (step 2).
```ts
export function annotation(): DecoratorFn {
    return Decorator.build(new AnnotationDecorator());
}

```
[back](#reflector-documentation)

#### STEP 2: Define Decorator Class
The next step is to define a new `AnnotationDecorator` class by extending abstract [Decorator](https://github.com/semaver/split-ts/blob/master/packages/reflector/src/com/split/decorators/Decorator.ts) class from **`reflector`** package. The main purpose of `AnnotationDecorator` class is to define/overwrite decoration policies (step 3) and define accepted by decorator function arguments (step 4).

```ts
import {Decorator} from "@semaver/reflector";

export function annotation(): DecoratorFn {
    return Decorator.build(new AnnotationDecorator());
}

export class AnnotationDecorator extends Decorator {
}

```
[back](#reflector-documentation)

#### [OPTIONAL] STEP 3: Define Decoration Policies
Decoration policies are required to define the rules for decorators' behavior in specific cases, mostly connected to class inheritance.
Currently, there are 5 policies:
* **[Access Policy](#access-policy)** defines if the decorator can be applied to a specific member, argument, or member group:
  - Default `ALL` - the decorator can be applied for all [Reflected Types](#reflected-types).
* **[Same-Target-Multi-Usage Policy](#same-target-multi-usage-policy)** defines the behavior of the decorator if the class member or the argument has more than one decorator of the same type for the same class member or argument:
  - Default `NOT_ALLOWED` - only the first decorator will be used.
* **[Collision Policy](#collision-policy)** defines the behavior of the decorator if it **EXISTS IN BOTH** the child class and its direct parent class for the same class member or argument:
  - Default `OVERRIDE_PARENT` - the decorator of the child class will be used.
* **[Not-Existence Policy](#not-existence-policy)** defines the behavior of the decorator if it does **NOT EXIST** in child class, but **EXISTS** in its direct parent class for the same class member or argument:
  - Default `APPLY` - the decorator of the direct parent class will be used.
* **[Appearance Policy](#appearance-policy)** defines the behavior of the decorator if it **EXISTS** in the child class but does **NOT EXIST** in the direct parent class for the same class member or argument:
  - Default `APPLY` - the decorator of the child class will be used.

> :information_source: Detailed information on decoration policies and their parameters can be found here: [Decoration Policies](#decoration-policies)

```ts
import {IFunction, IType} from "@semaver/core";
import {Decorator, MetadataAccessPolicy} from "@semaver/reflector";

export function annotation(): DecoratorFn {
    return Decorator.build(new AnnotationDecorator());
}

export class AnnotationDecorator extends Decorator {
    
    // allowed only for 
    // instance properties,
    // instance accessors,
    // parameters in constructors
    /* override */
    public getAccessPolicy(): MetadataAccessPolicy {
        return MetadataAccessPolicy.INST_PROPERTY
            | MetadataAccessPolicy.INST_ACCESSOR
            | MetadataAccessPolicy.PARAMETER_IN_CONSTRUCTOR;
    }

    // if decorator exists on the same class member or parameter in child class and superclass,
    // child class decorator will be used
    /* override */
    public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy): MetadataCollisionPolicy {
      return MetadataCollisionPolicy.OVERRIDE_PARENT;
      }

    // if decorator exists on the class member or parameter in superclass, but does not exist in child class,  
    // superclass decorator will be used for child class member
    /* override */
    public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy): MetadataNotExistencePolicy {
      return MetadataNotExistencePolicy.APPLY;
    }

    // multiple decorators on the same class member or parameter is not allowed
    /* override */
    public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy): MetadataSameTargetMultiUsagePolicy {
      return MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED;
    }
}

```
**Policy Provider**

The approach above is very general: we use the same policies for selected class members and parameters. It is also possible to have different sets of policies for different reflection types. To do this, we need to define them via Policy Provider.

For example, let's create a decorator that is allowed for methods (MetadataAccessPolicy.METHOD) and properties (MetadataAccessPolicy.PROPERTY). All policies are the same, except SameTargetMultiUsagePolicy. SameTargetMultiUsagePolicy allows using multiple decorators for an instance method and properties but does not allow this for static methods and properties. Other reflection types are not configured in MetadataAccessPolicy, so any policies for them will be ignored.

```ts
export function annotation(type: string, ...params: any[]): IFunction<void> {
  return Decorator.build(new AnnotationDecorator());
}

export class AnnotationDecorator extends Decorator {

  private static policyProvider: IPolicyProvider =
          // decorator is allowed for methods and properties only	
          new PolicyProvider(MetadataAccessPolicy.METHOD | MetadataAccessPolicy.PROPERTY)
                  .setAppearancePolicy(MetadataAppearancePolicy.DEFAULT)
                  .setCollisionPolicy(MetadataCollisionPolicy.DEFAULT)
                  .setNotExistencePolicy(MetadataNotExistencePolicy.DEFAULT)
                  // it is allowed to have multiple decorators for instance methods and properties
                  .setSameTargetMultiUsagePolicy(
                          MetadataSameTargetMultiUsagePolicy.ALLOWED,
                          MetadataAccessPolicy.INST_METHOD | MetadataAccessPolicy.INST_PROPERTY)
                  // it is NOT allowed to have multiple decorators for static methods and properties
                  .setSameTargetMultiUsagePolicy(
                          MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED,
                          MetadataAccessPolicy.STATIC_METHOD | MetadataAccessPolicy.STATIC_PROPERTY)
                  // it is IGNORED, cause MetadataAccessPolicy is not congigured for the CONSTRUCTOR
                  .setSameTargetMultiUsagePolicy(
                          MetadataSameTargetMultiUsagePolicy.ALLOWED,
                          MetadataAccessPolicy.CONSTRUCTOR)

  ;

  public getAccessPolicy(): MetadataAccessPolicy {
    return AnnotationDecorator.policyProvider.getAccessPolicy();
  }

  public getAppearancePolicy(access: PrimitiveMetadataAccessPolicy): MetadataAppearancePolicy {
    return AnnotationDecorator.policyProvider.getAppearancePolicy(access);
  }

  public getNotExistencePolicy(access: PrimitiveMetadataAccessPolicy): MetadataNotExistencePolicy {
    return AnnotationDecorator.policyProvider.getNotExistencePolicy(access);
  }

  public getCollisionPolicy(access: PrimitiveMetadataAccessPolicy): MetadataCollisionPolicy {
    return AnnotationDecorator.policyProvider.getCollisionPolicy(access);
  }

  public getSameTargetMultiUsagePolicy(access: PrimitiveMetadataAccessPolicy): MetadataSameTargetMultiUsagePolicy {
    return AnnotationDecorator.policyProvider.getSameTargetMultiUsagePolicy(access);
  }
}
```
[back](#reflector-documentation)

#### [OPTIONAL] STEP 4: Define Decorator Parameters
If necessary, it's possible to set different custom parameters for the annotation decorator.

```ts
import {Decorator} from "@semaver/reflector";

export function annotation(): DecoratorFn {
    return Decorator.build(new AnnotationDecorator(1, "someString"));
}

export class AnnotationDecorator extends Decorator {

    protected readonly myParam1: number;
    protected readonly myParam2: string;

    constructor(myParam1: number, myParam2: number){
        super();
        this.myParam1 = myParam1;
        this.myParam2 = myParam2;
    }

    public getParam1(): number {
        return this.myParam1;
    }

    public getParam2(): string {
        return this.myParam2;
    }

    /* override */
    public getParameters(): ReadonlyArray<unknown> {
        return [this.myParam1, this.myParam2];
    }
}

```

[back](#reflector-documentation)

### Use Annotation Decorators
The annotation decorators are applied in the same manner as typical [TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html): @decorator. However, the use of the [Decoration Policies](#decoration-policies) can make significant difference.

For example, for `@annotation` the Access policy is set to `MetadataAccessPolicy.PROPERTY`. The decorator is allowed on class properties only, for all other use cases it will be ignored.

```ts
export class MyClass extends MySuperClass {

    // ALLOWED
    @annotation()
    public data: MyData;
    
     // NOT ALLOWED BY ACCESS POLICY -> IGNORED
  public constructor(@annotation() myOtherData: MyOtherData) {
    super();
  }
    
    // NOT ALLOWED BY ACCESS POLICY -> IGNORED
    @annotation()
    public myMethod(myOtherData:MyOtherData) {
        
    }
    
}
```
> :warning: **Constructor Parameters**: If you define the constructor in the child class (override parent constructor), then you have to apply decorators for constructor parameters again. Overriding of the parent constructor is handled similarly to a definition of a new method, so no policies that are defined in the parent constructor can be applied. Detailed explanation of this case can be found here: [Annotation Decorators Usage for Constructor Parameters](#annotation-decorators-usage-for-constructor-parameters);

[back](#reflector-documentation)

### Decoration Policies
Decoration policies are required to define the rules for decorators' behavior in specific cases. Currently, there are 2 general policies and 3 class inheritance policies: 

**General Policies:**
- [Access Policy](#access-policy) 
- [Same-Target-Multi-Usage Policy](#same-target-multi-usage-policy) 

**Class Inheritance Policies:**
- [Collision Policy](#collision-policy) 
- [Not-Existence Policy](#not-existence-policy)
- [Appearance Policy](#appearance-policy)

[back](#reflector-documentation)

#### Access Policy

`MetadataAccessPolicy` -defines, if the decorator can be applied to a specific member, argument, or member group. 

Default: `MetadataAccessPolicy.ALL`

```ts
export enum MetadataAccessPolicy {
  NONE = 0,

  CONSTRUCTOR = 1,

    INST_PROPERTY = 2,
    STATIC_PROPERTY = 4,
    PROPERTY = INST_PROPERTY | STATIC_PROPERTY,

    INST_ACCESSOR = 8,
    STATIC_ACCESSOR = 16,
    ACCESSOR = INST_ACCESSOR | STATIC_ACCESSOR,

    INST_METHOD = 32,
    STATIC_METHOD = 64,
    METHOD = INST_METHOD | STATIC_METHOD,

    PARAMETER_IN_CONSTRUCTOR = 128,
    PARAMETER_IN_INST_METHOD = 256,
    PARAMETER_IN_STATIC_METHOD = 512,
    PARAMETER_IN_METHOD = PARAMETER_IN_INST_METHOD | PARAMETER_IN_STATIC_METHOD,
    PARAMETER = PARAMETER_IN_CONSTRUCTOR | PARAMETER_IN_METHOD,

    ALL = CONSTRUCTOR | PROPERTY | ACCESSOR | METHOD | PARAMETER,
}
```

[back](#reflector-documentation)

#### Same-Target-Multi-Usage Policy

`MetadataSameTargetMultiUsagePolicy` - defines the behavior for the decorator if the class member or the argument has more than one decorator of the same type for the **same class member or argument**:
  * `ALLOWED` - all decorators are registered;
  * `NOT_ALLOWED` - only the first decorator is registered.

Default: `MetadataSameTargetMultiUsagePolicy.NOT_ALLOWED`

```ts
export enum MetadataSameTargetMultiUsagePolicy {
    ALLOWED,
    NOT_ALLOWED,
    DEFAULT = NOT_ALLOWED,
}
```

[back](#reflector-documentation)

#### Collision Policy

`MetadataCollisionPolicy ` - defines the behavior for the decorator if it **EXISTS IN BOTH** the child class and its direct parent class for the same class member or argument:
  * `SKIP` - both decorators (from the child class and the direct parent class) are **not used** for the child class;
  * `OVERRIDE_CHILD` - decorator from the direct parent class is used for the child class;
  * `OVERRIDE_PARENT`- decorator from the child class is used for the child class;
  * `JOIN` - both decorators (from the child class and the direct parent class) are **used** for the child class;
  * `THROW_ERROR` - if the collision happens, the error will be thrown.

Default: `MetadataCollisionPolicy.OVERRIDE_PARENT`

```ts
export enum MetadataCollisionPolicy {
    SKIP,
    OVERRIDE_CHILD,
    OVERRIDE_PARENT,
    JOIN,
    THROW_ERROR,
    DEFAULT = OVERRIDE_PARENT,
}
```

[back](#reflector-documentation)

#### Not-Existence Policy

`MetadataNotExistencePolicy` - defines the behavior of the decorator if it does **NOT EXIST** in child class, but **EXISTS** in its direct parent class for the same class member or argument:
  * `SKIP` - decorator from the direct parent class is **not used** for the child class;
  * `APPLY` - decorator from the direct parent class is **used** for the child class.

Default: `MetadataNotExistencePolicy.APPLY`

```ts
export enum MetadataNotExistencePolicy {
  SKIP,
  APPLY,
  DEFAULT = APPLY,
}
```

[back](#reflector-documentation)

#### Appearance Policy

`MetadataAppearancePolicy` - defines the behavior of the decorator if it **EXISTS** in the child class but does **NOT EXIST** in the direct parent class for the same class member or argument.
  * `SKIP` - decorator from the child class is **not used** if the other decorator is found in any non-direct parent (superclass which is higher in the hierarchy, but not the direct parent. Situations with the direct parent are covered in [Collision Policy](#collision-policy));
  * `APPLY` - decorator from the child class is used, ignoring any other superclass decorators.

Default: `MetadataAppearancePolicy.APPLY`


```ts
export enum MetadataAppearancePolicy {
  SKIP,
  APPLY,
  DEFAULT = APPLY,
}
```

[back](#reflector-documentation)

## Architectural Notes

###  Reflected Types Architecture
The diagram shows supported reflected types of class members & parameters with supported API for these types.

![](https://raw.githubusercontent.com/semaver/core-stack/main/packages/reflector/diagrams/reflector-class-members.svg)

[back](#reflector-documentation)


### Behind the Scene of Annotation Decorators
Usage of [Annotation Decorators](#annotation-decorators) is necessary if you want the Reflector to return information on decorated class members.

**So how is this information provided?**

Every reflected class gets two properties: `__metadata__` & `__cached_metadata__`: 

* **metadata property** contains the class own information on decorated class members;
* **cached_metadata property** contains class own info(**metadata property**) merged with its superclass **cached_metadata property** based on the [Decoration Policies](#decoration-policies).

To support the inheritance of decorated class members, acc. to the [Decoration Policies](#decoration-policies), the calculation and recalculation (in case of any changes) for the **cached_metadata** property is required. The calculation starts from the top superclass and then goes step by step through the chain of all child classes. **cached_metadata** is optimized with cache to avoid unnecessary recalculations.

To retrieve the latest state of class metadata information, the Reflector works directly with the **cached_metadata** property.

```ts
// __metadata__ = decorators of SuperClass only
// __cached_metadata__ = __metadata__(SuperClass)
@annotation()
export class SuperClass {

}

// __metadata__ = decorators of ChildClass only
// __cached_metadata = 
//          __metadata__(ChildClass) merged with __cached_metadata__(SuperClass) based on policies
@annotation()
export class ChildClass extends SuperClass {

}

// __metadata__ = decorators of ChildOfChildClass only
// __cached_metadata = 
//          __metadata__(ChildOfChildClass) merged with __cached_metadata__(ChildClass) based on policies
@annotation()
export class ChildOfChildClass extends ChildClass {

}
```
[back](#reflector-documentation)

### Annotation Decorators Usage for Constructor Parameters
If you define the constructor in the child class (override parent constructor), then you have to apply decorators for constructor parameters again. Overriding of the parent constructor is handled similarly to a definition of a new method, so no policies that are defined in the parent constructor can be applied.

Let's check some examples to understand why this is important, even when the child constructor has a similar signature. 

First, we define a superclass with parameters in the constructor:

```ts
// superclass definition
export class SuperClass {
    public constructor(dataA: FirstData, dataB: SecondData) {
    }
}
```

Second, we define child classes that are extending superclass:

```ts
// child class with same parameter order
// constructor known parameters length = 2
export class WithSameParameterOrderChildClass extends SuperClass {
    public constructor(dataA: FirstData, dataB: SecondData) {
        super(dataA, dataB)
    }
}

// child class with custom parameter order
// constructor known parameters length = 2
export class WithCustomParameterOrderChildClass extends SuperClass {
    public constructor(dataB: SecondData, dataA: FirstData) {
        super(dataA, dataB)
    }
}

// child class with args
// constructor known parameters length = 0
export class ArgsChildClass extends SuperClass {
    public constructor(...args:any[]) {
        super(args[0], args[1])
    }
}

// child class with default constructor
// constructor known parameters length = 0
export class EmptyCosntructorChildClass extends SuperClass {
}

```

Now let's add some annotation decorator(e.g. `@inject`) to constructor parameters with `MetadataNotExistencePolicy.APPLY` policy. This policy means that if the decorator does not exist in the child class, but exists in the direct parent class on the same parameter in the constructor, the Reflector uses the decorator from the direct parent class in the child class.

So let's decorate the superclass:

```ts
// superclass definition
export class SuperClass {
  public constructor(
          @inject(FirstData) dataA: FirstData,
          @inject(SecondData) dataB: SecondData) {
  }
}
```

The major problem with the propagation of the decorator to the child constructor parameters is that we know only parameter positions, but we don't know parameter types because they are erased in JavaScript. So there is no way to handle the case in `WithCustomParameterOrderChildClass`. Even more, the constructor can be defined with extra parameters or with a single one, can contain optional parameters, etc. 

That's why the main and important rule for constructors: 

> :warning: If constructor parameter length > 0 (aka `knowParameterLength`) we need to redefine decorators even if the order of parameters is the same in the superclass.

```ts
// child class with same parameter order
// constructor known parameters length = 2
// REDEFINE DECORATORS
export class WithSameParameterOrderChildClass extends SuperClass {
  public constructor(
          @inject(FirstData) dataA: FirstData,
          @inject(SecondData) dataB: SecondData) {
    super(dataA, dataB)
  }
}

// child class with custom parameter order
// constructor known parameters length = 2
// REDEFINE DECORATORS
export class WithCustomParameterOrderChildClass extends SuperClass {
  public constructor(
          @inject(SecondData) dataB: SecondData,
          @inject(FirstData) dataA: FirstData) {
    super(dataA, dataB)
  }
}

// child class with args
// constructor known parameters length = 0
// NOT REDEFINE DECORATORS
export class ArgsChildClass extends SuperClass {
  public constructor(...args: any[]) {
    super(args[0], args[1])
  }
}

// child class with default constructor
// constructor known parameters length = 0
// NOT REDEFINE DECORATORS
export class EmptyCosntructorChildClass extends SuperClass {
}

```

[back](#reflector-documentation)
