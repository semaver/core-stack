import {reflect} from "../../../src";

export class AsyncSuperClass {
    @reflect()
    public async asyncMethod(@reflect() someParam: number, _otherParam: number, ..._args: unknown[]): Promise<number> {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve(someParam);
            }, 1);
        }));
    }
}
