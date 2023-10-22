export class SuperNonDecoratedArgConstructorClass {
    public constructor(...args: unknown[]) {
        void (args);
    }

    public method(...args: unknown[]): void {
        void (args);
    }
}

export class ChildNonDecoratedArgConstructor1Class extends SuperNonDecoratedArgConstructorClass {
    public constructor(...args: unknown[]) {
        super(...args);
    }

    public method(...args: unknown[]): void {
        void (args);
    }
}

export class ChildNonDecoratedArgConstructor2Class extends SuperNonDecoratedArgConstructorClass {
    public constructor(param1: string, param2: string) {
        super(param1, param2);
    }

    public method(param1: string, param2: string): void {
        void (param1);
        void (param2);
    }
}

export class ChildNonDecoratedArgConstructor3Class extends SuperNonDecoratedArgConstructorClass {
    public constructor() {
        super();
    }

    public method(): void {
        void (0);
    }
}

export class ChildNonDecoratedArgConstructor4Class extends SuperNonDecoratedArgConstructorClass {
}