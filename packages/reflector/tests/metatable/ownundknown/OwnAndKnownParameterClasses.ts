import {inject} from "../../example_1/decorators";
import {FirstData} from "./FirstData";
import {SecondData} from "./SecondData";

// SUPE class with 2 decorated parameters
// Constructor OWN parameters length = 2
// Constructor KNOWN parameters length = 2
export class SuperClass {
    public constructor(
        @inject(FirstData) dataA: FirstData,
        @inject(SecondData) dataB: SecondData) {
        void (dataA);
        void (dataB);
    }

    public someMethod(): void {
        void (0);
    }
}

// Child class with the same parameter order
// Constructor OWN parameters length = 2
// Constructor KNOWN parameters length = 2
// REDEFINE DECORATORS
export class WithSameParameterOrderChildClass extends SuperClass {
    public constructor(
        @inject(FirstData) dataA: FirstData,
        @inject(SecondData) dataB: SecondData) {
        super(dataA, dataB);
    }
}

// Child class with custom parameter order
// Constructor OWN parameters length = 2
// Constructor KNOWN parameters length = 2
// REDEFINE DECORATORS
export class WithCustomParameterOrderChildClass extends SuperClass {
    public constructor(
        @inject(SecondData) dataB: SecondData,
        @inject(FirstData) dataA: FirstData) {
        super(dataA, dataB);
    }
}

// Child class with variadic arguments
// Constructor OWN parameters length = 0
// Constructor KNOWN parameters length = 2
// NO NEED TO REDEFINE DECORATORS (inherited from SuperClass)
export class ArgsChildClass extends SuperClass {
    public constructor(...args: any[]) {
        super(args[0] as FirstData, args[1] as SecondData);
    }
}

// Child class with default constructor
// Constructor OWN parameters length = 0
// Constructor KNOWN parameters length = 2
// NO NEED TO REDEFINE DECORATORS (inherited from SuperClass)
export class EmptyConstructorChildClass extends SuperClass {
    public someMethod(): void {
        void (0);
    }
}
