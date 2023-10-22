export class SuperNonDecoratedParamConstructorClass {
    public constructor(param1: string, param2: string) {
        void (param1);
        void (param2);
    }

    public method(param1: string, param2: string): void {
        void (param1);
        void (param2);
    }
}

export class ChildNonDecoratedParamConstructor1Class extends SuperNonDecoratedParamConstructorClass {
    public constructor(...args: unknown[]) {
        super(args[0] as string, args[1] as string);
    }

    public method(...args: unknown[]): void {
        void (args);
    }
}

export class ChildNonDecoratedParamConstructor2Class extends SuperNonDecoratedParamConstructorClass {
    public constructor(param1: string, param2: string) {
        super(param1, param2);
    }

    public method(param1: string, param2: string): void {
        void (param1);
        void (param2);
    }
}

export class ChildNonDecoratedParamConstructor3Class extends SuperNonDecoratedParamConstructorClass {
    public constructor() {
        super("param1", "param2");
    }

    public method(): void {
        void (0);
    }
}

export class ChildNonDecoratedParamConstructor4Class extends SuperNonDecoratedParamConstructorClass {
}