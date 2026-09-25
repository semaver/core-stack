export class SuperNonDecoratedEmptyConstructorClass {
    public constructor() {
        return;
    }

    public method(): void {
        return;
    }
}

export class ChildNonDecoratedEmptyConstructor1Class extends SuperNonDecoratedEmptyConstructorClass {
    public constructor(..._args: unknown[]) {
        super();
    }

    public method(..._args: unknown[]): void {
        return;
    }
}

export class ChildNonDecoratedEmptyConstructor2Class extends SuperNonDecoratedEmptyConstructorClass {
    public constructor(_param1: string, _param2: string) {
        super();
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
        return;
    }
}

export class ChildNonDecoratedEmptyConstructor4Class extends SuperNonDecoratedEmptyConstructorClass {
}