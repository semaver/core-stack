import {reflect} from "../../../src";

export class AsyncSuperClass {

    @reflect()
    public async asyncMethod(@reflect() someParam: number, otherParam: number = 1, ...args: void[]): Promise<number> {
        void (otherParam);
        void (args);
        return new Promise((resolve => {
            setTimeout(() => {
                resolve(someParam);
            }, 150);
        }));
    }
}
