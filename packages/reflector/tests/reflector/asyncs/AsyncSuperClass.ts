import {reflect} from "../../../src";

export class AsyncSuperClass {
    @reflect()
    public async asyncMethod(@reflect() someParam: number, otherParam: number, ...args: unknown[]): Promise<number> {
        void (otherParam);
        void (args);
        return new Promise((resolve => {
            setTimeout(() => {
                resolve(someParam);
            }, 1);
        }));
    }
}
