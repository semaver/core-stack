export class SuperNonDecoratedEmptyConstructorClass {
    public constructor() {
        void (0);
    }

    public method(): void {
        void (0);
    }
}

export class ChildNonDecoratedEmptyConstructor1Class extends SuperNonDecoratedEmptyConstructorClass {
    public constructor(...args: unknown[]) {
        super();
        void (args);
    }

    public method(...args: unknown[]): void {
        void (args);
    }
}

export class ChildNonDecoratedEmptyConstructor2Class extends SuperNonDecoratedEmptyConstructorClass {
    public constructor(param1: string, param2: string) {
        super();
        void (param1);
        void (param2);
    }

    // public method(param1:string, param2:string):void{
    //     void (param1);
    //     void (param2);
    // }
}

export class ChildNonDecoratedEmptyConstructor3Class extends SuperNonDecoratedEmptyConstructorClass {
    public constructor() {
        super();
    }

    public method(): void {
        void (0);
    }
}

export class ChildNonDecoratedEmptyConstructor4Class extends SuperNonDecoratedEmptyConstructorClass {
}