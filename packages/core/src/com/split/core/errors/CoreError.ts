/**
 * @public
 * @class
 * @extends [[Error]]
 * @description - default error with object where error is thrown
 */
export class CoreError extends Error {
    /**
     * @public
     * @static
     * @method - to throw a default error
     * @param target - object where error is thrown
     * @param error - description of error
     * @return never
     */
    public static throwDefault<T>(target: T, error: string = "Error"): never {
        throw new CoreError(target, error);
    }

    /**
     * @public
     * @static
     * @method - to throw an error
     * @param error - instance of [[Error]]
     * @return never
     */
    public static throwError<T extends Error>(error: T): never {
        throw error;
    }

    /**
     * @public
     * @constructor
     * @param target - object where error is thrown
     * @param error - description of error
     */
    public constructor(target: unknown, error: string) {
        super(`[${target}] ${error}`);
    }
}
