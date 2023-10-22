import {SuperReflectedClass} from "./SuperReflectedClass";

export class ChildSameArgsReflectedClass extends SuperReflectedClass {

    public constructor() {
        super("aaa");
        const bbb: number = 10;
        console.log(bbb);
    }

    public runNormal(): number {
        return super.runNormal("aaa");
    }

    // public runNormal(param: string): number {
    //     return 0;
    // }

    // public runNormal(param: string, hallo?: string): number {
    //     return 0;
    // }
}
