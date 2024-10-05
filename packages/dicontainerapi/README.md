# @semaver/dicontainer-api    
 The base interfaces and types which necessary to solve compatibility issues between different container implementations.    
    
## Introduction    
This package contains the basic definitions of a dependency injection container. Each DI solution has a different way of binding/binding of objects. Each has different names and conventions. We aim to have a unique API so we would have an abstract API definition.   

So we are able to use different implementations or different DiContainer packages in our own solutions. It lets us to compare different implementations. If you also want to implement a different container solution and use with split library you should use this API.      
    
## Installation    
 You can add dicontainer-api on your project simply running one of that commands:    
    
- `yarn add @semaver/dicontainer-api` 
- `npm install @semaver/dicontainer-api`    
 ## Table Of Contents    
 - [API](#API) 
    - [Container](#dependency-injection-container)
       - [binding](#binding)
       - [unbind](#unbind)
       - [unbindAll](#unbind-all)
       - [getInstance](#get-instance)
       - [fromInstance](#from-instance)
       - [getOrigin](#get-origin)
    - [Bindings](#dependency-injection-bindings)
       - [toSingleton](#bind-to-singleton)
       - [toSingletonOf](#bind-to-singleton-of)
       - [toValue](#bind-to-value)
       - [toNewInstance](#bind-to-new-instance)
       - [toNewInstanceOf](#bind-to-new-instance-of)
       - [toInstanceFactory](#bind-to-instance-factory)
       - [toSingletonClassFactory](#bind-to-singleton-class-factory)
       - [toNewInstanceClassFactory](#bind-to-new-instance-class-factory)
       - [unbind](#unbind)
       - [hasBinding](#has-binding)
    - [Types and Methods](#types-and-methods)  
       - [DependencyId](#dependency-id)
       - [DiClassFactory](#class-factory)
       - [DiInstanceFactory](#instance-factory)
       - [setDependencyId](#set-dependency-id)
       - [getDependencyId](#get-dependency-id)

## API
### Dependency Injection Container

```ts
interface IDiContainer<TContainer = any>
```

Where `TContainer` can be third party implementation, not compatible with API. 

#### **Methods:**

##### **Binding**

```ts
container.binding<T>(bindableType: IType<T>, id?: DependencyId): IDiContainerBinding<T>;
```

- Take the bindable type (class or interface) and optionally with binding id  (which can be a string, a number or a symbol) then return its [binding](#dependency-injection-binding), that can be configured to provide instances for the type.  

[back](#table-of-contents)

---
##### **Unbind**

```ts
container.unbind<T>(bindableType: IType<T>, id?: DependencyId): this;
```

- Removes the existing binding from provided type (class or interface).   

[back](#table-of-contents)

---
##### **Unbind all**

```ts
container.unbindAll(): this;
```

- Remove all bindings.  

[back](#table-of-contents)

---
##### **Get instance**

```ts
container.getInstance<T>(bindableType: IType<T>, id?: DependencyId): Nullable<T>;
```

- Returns the instance of the type (class or interface) which was bound before.  

[back](#table-of-contents)

---
##### **From instance**

```ts
container.fromInstance<T>(instance: T): T;
```

- Returns the instance with injected members of your manually created object. So you can have all injections on the fly except constructor injections.  

[back](#table-of-contents)

---
##### **Get origin**

```ts
container.getOrigin(): TContainer;
```

- Split-ts has own [implementation](https://github.com/semaver/split-ts-dicontainer-impl-split) of dicontainer-api, but it also can be used with third-party injectors as well, like [InversifyJS](https://github.com/inversify/InversifyJS), that contains own methods. For some cases you need to have access to this methods, that can be done using  `getOrigin` method, that return an instance of third-party injector, wrapped to fit API.

[back](#table-of-contents)

---
### Dependency Injection Bindings

```ts
interface IDiContainerBinding<T>
```

#### **Methods:**

##### **Bind to singleton**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toSingleton(): void;
```

- Create a binding for type (class) which create and then returns always the **same instance** of the given type (class).  
  

Examples:  
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(HTTPConnectionService)
    .toSingleton();  

container
    .binding(HTTPConnectionService, "HTTPConnectionServiceSecondary")
    .toSingleton();  

const connectionA : HTTPConnectionService =
      container.getInstance(HTTPConnectionService); 

const connectionB : HTTPConnectionService =
      container.getInstance(HTTPConnectionService); 

const connectionC : HTTPConnectionService =
      container.getInstance(HTTPConnectionService, "HTTPConnectionServiceSecondary"); 
```
Container will return instance of `HTTPConnectionService`. 

`connectionA === connectionB`

`connectionA !== connectionC`

---
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(SocketConnectionService, "SocketConnection")
    .toSingleton();   

const connectionA : SocketConnectionService =
      container.getInstance(SocketConnectionService, "SocketConnection"); 

const connectionB : SocketConnectionService =
      container.getInstance(SocketConnectionService, "SocketConnection"); 

const connectionC : SocketConnectionService =
      container.getInstance(SocketConnectionService); 
```
Container will return instance of `SocketConnectionService` associated with id `"SocketConnection"`,  

`connectionA === connectionB,`  
`connectionC === undefined (no binding with default id provided);  `

---
```ts  
diContainer.binding(IConnectionService).toSingleton(); 
```
Container will throw an error, interface cannot be instantiated.  

[back](#table-of-contents)

---
##### **Bind to singleton of**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toSingletonOf<K extends T>(targetClass: IClass<K>): void 
```

- Create a binding of type (class or interface ) which create and then returns always the **same instance** of the bound class.  

If type is interface, bound class should implement provided interface, if type is class, bound class should be of the same class or inherit provided class  

Examples:   
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toSingletonOf(SocketConnectionService); 

container
    .binding(IConnectionService,"SocketConnection")
    .toSingletonOf(SocketConnectionService);   

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService, "SocketConnection"); 
```
Type is interface (`SocketConnectionService` implement `IConnectionService`).  Container will return instance of `SocketConnectionService`,  

`connectionA === connectionB,`
`connectionA !== connectionC;`

---
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(AbstractHTTPConnectionService)
    .toSingletonOf(HTTPConnectionService); 

container
    .binding(AbstractHTTPConnectionService,"HTTPConnection")
    .toSingletonOf(HTTPConnectionService);   

const connectionA : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 

const connectionB : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 

const connectionC : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService, "HTTPConnection"); 
```
Type is class (`HTTPConnectionService` extends `AbstractHTTPConnectionService`).  Container will return instance of `AbstractHTTPConnectionService`,  

`connectionA === connectionB,`  
`connectionA !== connectionC; ` 

[back](#table-of-contents)

---
##### **Bind to value**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toValue(targetValue: T): void; 
```

- Create a binding of type (class or interface ) which returns always the **same bound value** (instance).  

If type is interface, bound value should be of class that implements provided interface, if type is class, bound value should have the same class or some class that inherits provided class  

Examples:   
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toValue(new SocketConnectionService()); 

container
    .binding(IConnectionService, "SocketConnection")
    .toValue(new SocketConnectionService());   

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService, "SocketConnection"); 
```
Type is interface (`SocketConnectionService` implement `IConnectionService`).  Container will return instance of `SocketConnectionService`,  

`connectionA === connectionB,`  
`connectionA !== connectionC;`  

---
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(AbstractHTTPConnectionService)
    .toValue(new HTTPConnectionService()); 

container
    .binding(AbstractHTTPConnectionService, "HTTPConnection")
    .toValue(new HTTPConnectionService());   

const connectionA : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 

const connectionB : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 

const connectionC : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService, "HTTPConnection"); 
```
Type is class (`HTTPConnectionService` extends `AbstractHTTPConnectionService`).  Container will return instance of `HTTPConnectionService`,   

`connectionA === connectionB,`  
`connectionA !== connectionC; ` 

---
```ts  
const myHTTPConnectionService : HTTPConnectionService = new HTTPConnectionService()  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IHTTPConnectionService)
    .toValue(myHTTPConnectionService); 

container
    .binding(AbstractHTTPConnectionService)
    .toValue(myHTTPConnectionService);   

const connectionA : IHTTPConnectionService =
      container.getInstance(IHTTPConnectionService);

const connectionB : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 
```
Container will return instance of `HTTPConnectionService`,  

`connectionA === connectionB;  `

[back](#table-of-contents)

---
##### **Bind to new instance**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toNewInstance(): void; 
```

-  Create a binding of type (class) which returns always a **new instance** of the given type (class)  

Examples:  
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(HTTPConnectionService)
    .toNewInstance();  

container
    .binding(HTTPConnectionService, "HTTPConnectionService")
    .toNewInstance();  
  
const connectionA : HTTPConnectionService =
      container.getInstance(HTTPConnectionService); 

const connectionB : HTTPConnectionService =
      container.getInstance(HTTPConnectionService); 
```
Container will return instance of `HTTPConnectionService`,  

`connectionA !== connectionB;`  

---
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(SocketConnectionService, "SocketConnection")
    .toNewInstance();   

const connectionA : SocketConnectionService =
      container.getInstance(SocketConnectionService, "SocketConnection"); 

const connectionB : SocketConnectionService =
      container.getInstance(SocketConnectionService, "SocketConnection"); 

const connectionC : SocketConnectionService =
      container.getInstance(SocketConnectionService); 
```
Container will return new instance of `SocketConnectionService` associated with id `"SocketConnection"`,  

`connectionA !== connectionB,  `
`connectionC === undefined // (no binding with default id provided);  `

---
```ts  
diContainer.binding(IConnectionService).toSingleton(); 
```
Container will throw an error, interface cannot be instantiated.  

[back](#table-of-contents)

---

##### **Bind to new instance of**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toNewInstanceOf<K extends T>(targetClass: IClass<K>): void 
```

- Create a binding of type (class or interface ) which create and then returns always a **new instance** of the bound class.  
  

If type is interface, bound class should implement provided interface, if type is class, bound class should be of the same class or inherit provided class  

Examples:   
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toNewInstanceOf(SocketConnectionService); 

container
    .binding(IConnectionService,"SocketConnection")
    .toNewInstanceOf(SocketConnectionService);   

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService, "SocketConnection"); 
```
Type is interface (`SocketConnectionService` implement `IConnectionService`).  Container will return instance of `SocketConnectionService`,  

`connectionA !== connectionB,`   
`connectionA !== connectionC;`  

---
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(AbstractHTTPConnectionService)
    .toNewInstanceOf(HTTPConnectionService); 

container
    .binding(AbstractHTTPConnectionService, "HTTPConnection")
    .toNewInstanceOf(HTTPConnectionService);   

const connectionA : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 

const connectionB : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService); 

const connectionC : AbstractHTTPConnectionService =
      container.getInstance(AbstractHTTPConnectionService, "HTTPConnection"); 
```
Type is class (`HTTPConnectionService` extends `AbstractHTTPConnectionService`).  Container will return instance of `AbstractHTTPConnectionService`,  

`connectionA !== connectionB,`   
`connectionA !== connectionC`  

[back](#table-of-contents)

---
##### **Bind to instance factory**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toInstanceFactory(factory: DiInstanceFactory<T>): void 
```

- Create a binding of type (class or interface ) which create and then returns **provided instance** of given type (class or interface) from instance factory

Examples:   
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toInstanceFactory(() => {
    	return new HTTPConnectionService();
	}); 

container
    .binding(IConnectionService, "HTTPConnection")
    .toInstanceFactory(() => {
		return new HTTPConnectionService();
	}); 

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService, "HTTPConnection"); 
```
Type is interface (`HTTPConnectionService` implement `IConnectionService`).  Container will return instance of `HTTPConnectionService`,  

`connectionA !== connectionB,`   
`connectionA !== connectionC;`  

---

```ts  
const connectionService : IConnectionService = new HTTPConnectionService();
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toInstanceFactory(() => {
		return connectionService;
	}); 

container
    .binding(IConnectionService, "HTTPConnection")
    .toInstanceFactory(() => {
		return connectionService;
	}); 

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService, "HTTPConnection"); 
```
Type is interface (`HTTPConnectionService` implement `IConnectionService`).  Container will return instance of `HTTPConnectionService`,  

`connectionA === connectionB,`   
`connectionA === connectionC;`  

[back](#table-of-contents)

---
##### **Bind to singleton class factory**  

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toSingletonClassFactory(factory: DiClassFactory<T>): void 
```

  - Create a binding of type (class or interface ) which create an instance using class factory and then returns always the **same instance**  until the factory provides a new class for instantiation.
Examples:   
```ts  
let useSockets : boolean = false;
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toSingletonClassFactory(() => {
		return useSockets ? SocketConnectionService : HTTPConnectionService;
}); 

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService);

useSockets = true;

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService);

const connectionD : IConnectionService = 
      container.getInstance(IConnectionService); 
```
Type is interface (`HTTPConnectionService` and `SocketConnectionService` implement `IConnectionService`). Container will return instance of `HTTPConnectionService`,   

`connectionA === connectionB,`  
after `useSockets` is set to `true`, will return instance of `SocketConnectionService`,  
`connectionC === connectionD,`  
`connectionA !== connectionC;`

[back](#table-of-contents)

---
##### **Bind to 'new instance' class factory**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .toNewInstanceClassFactory(factory: DiClassFactory<T>): void 
```

- Create a binding of type (class or interface ) which create an instance using class factory and then returns always a **new instance** of  the class provided by class factory.

```ts  
let useSockets : boolean = false;
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container
    .binding(IConnectionService)
    .toNewInstanceClassFactory(() => {
    	return useSockets ? SocketConnectionService : HTTPConnectionService;
	}); 

const connectionA : IConnectionService = 
      container.getInstance(IConnectionService); 

const connectionB : IConnectionService = 
      container.getInstance(IConnectionService);

useSockets = true;

const connectionC : IConnectionService = 
      container.getInstance(IConnectionService);

const connectionD : IConnectionService = 
      container.getInstance(IConnectionService); 
```

Type is interface (`HTTPConnectionService` and `SocketConnectionService` implement `IConnectionService`).  Container will return instance of `HTTPConnectionService`,  

`connectionA !== connectionB,`
after `useSockets` is set to`true`, will return instance of `SocketConnectionService`,
`connectionC !== connectionD,`
`connectionA !== connectionC;`

[back](#table-of-contents)

---
##### **Unbind**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .unbind(): this
```

-  Removes the existing binding from provided type (class or interface).

[back](#table-of-contents)

---
##### **Has binding**

```ts
container
    .binding<T>(bindableType: IType<T>, id?: DependencyId)
    .hasBinding(): boolean
```

- Checks if any binding defined for current type (class or interface).  

[back](#table-of-contents)

---

## Types and Methods

##### **Dependency id**

```ts
type DependencyId = string | number | symbol;
```

[back](#table-of-contents)

##### **Class factory**

```ts
type DiClassFactory<T> = () => IClass<T> 
```

- Type of a factory method which returns the **class** of given generic type.

[back](#table-of-contents)

---
##### **Instance factory**

```ts
type DiInstanceFactory<T> = () => T 
```

- Type of a factory method which returns the **instance** of given generic type.

[back](#table-of-contents)

---
##### **Set dependency id**

```ts
function setDependencyId(id: DependencyId): void 
```

- Global method to set **custom** default dependency id. The system default dependency id equals empty string "", it can be replaced using this method.

[back](#table-of-contents)

---
##### **Get dependency id**

```ts
function getDependencyId(id: DependencyId): DependencyId 
```

- Global method to get safe dependency id.  If null or undefined is provided , then custom (provided by user) default id used (custom id can be set with `setDependencyId` global method), if it also not set, then used system default id.

Examples:  
```ts  
const container:IDiContainer<SomeContainerImpl> = new SomeContainerImpl()

container.binding(HTTPConnectionService).toSingleton();
// same as above
// diContainer.binding(HTTPConnectionService, null).toSingleton();
// diContainer.binding(HTTPConnectionService, undefined).toSingleton();

const connectionA : HTTPConnectionService = 
      container.getInstance(HTTPConnectionService, null); 

const connectionB : HTTPConnectionService = 
      container.getInstance(HTTPConnectionService, undefined); 

const connectionC : HTTPConnectionService =
      container.getInstance(HTTPConnectionService); 
```
Container will return instance of `HTTPConnectionService`,  

`connectionA === connectionB === connectionC`

[back](#table-of-contents)
