/**
 * @public
 * @class
 * @extends [[Error]]
 * @description - default error with object where error is thrown
 */
export class ExtendedError extends Error {
    /**
     * @public
     * @constructor
     * @param target - object where error is thrown
     * @param error - description of error
     */
    public constructor(target: object, error: string) {
        super(`[${String(target)}] ${error}`);
    }
}

/**
 * @public
 * @function to throw a default error
 * @param target - object where error is thrown
 * @param error - description of error
 * @return never
 */
export function throwDefault(target: object, error: string = "Error"): never {
    throw new ExtendedError(target, error);
}

/**
 * @public
 * @function to throw an error
 * @param error - instance of [[Error]]
 * @return never
 */
export function throwError(error: Error): never {
    throw error;
}
