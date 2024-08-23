import {IInterface, InterfaceSymbol} from "@semaver/core";

export const AnotherTypeInterface: IInterface<AnotherTypeInterface> = InterfaceSymbol.for("AnotherTypeInterface");

export interface AnotherTypeInterface {
    someMethod(): void;
}
