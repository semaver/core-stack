export class SuperNonDecoratedParamConstructorClass {
    public constructor(_param1: string, _param2: string) {
        return;
    }

    public method(_param1: string, _param2: string): void {
        return;
    }
}

export class ChildNonDecoratedParamConstructor1Class extends SuperNonDecoratedParamConstructorClass {
    public constructor(...args: unknown[]) {
        super(args[0] as string, args[1] as string);
    }

    public method(..._args: unknown[]): void {
        return;
    }
}

export class ChildNonDecoratedParamConstructor2Class extends SuperNonDecoratedParamConstructorClass {
    public constructor(param1: string, param2: string) {
        super(param1, param2);
    }

    public method(_param1: string, _param2: string): void {
        return;
    }
}

export class ChildNonDecoratedParamConstructor3Class extends SuperNonDecoratedParamConstructorClass {
    public constructor() {
        super("param1", "param2");
    }

    public method(): void {
        return;
    }
}

export class ChildNonDecoratedParamConstructor4Class extends SuperNonDecoratedParamConstructorClass {
}