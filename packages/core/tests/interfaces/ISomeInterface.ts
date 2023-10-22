import {IInterface, InterfaceSymbol} from "../../src";

export const ISomeInterface: IInterface<ISomeInterface> = InterfaceSymbol.for("ISomeInterface");

export interface ISomeInterface {
    someMethod(): void;
}
