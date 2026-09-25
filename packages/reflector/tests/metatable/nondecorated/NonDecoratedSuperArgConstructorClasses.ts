export class SuperNonDecoratedArgConstructorClass {
    public constructor(..._args: unknown[]) {
        return;
    }

    public method(..._args: unknown[]): void {
        return;
    }
}

export class ChildNonDecoratedArgConstructor1Class extends SuperNonDecoratedArgConstructorClass {
    public constructor(...args: unknown[]) {
        super(...args);
    }

    public method(..._args: unknown[]): void {
        return;
    }
}

export class ChildNonDecoratedArgConstructor2Class extends SuperNonDecoratedArgConstructorClass {
    public constructor(param1: string, param2: string) {
        super(param1, param2);
    }

    public method(_param1: string, _param2: string): void {
        return;
    }
}

export class ChildNonDecoratedArgConstructor3Class extends SuperNonDecoratedArgConstructorClass {
    public constructor() {
        super();
    }

    public method(): void {
        return;
    }
}

export class ChildNonDecoratedArgConstructor4Class extends SuperNonDecoratedArgConstructorClass {
}