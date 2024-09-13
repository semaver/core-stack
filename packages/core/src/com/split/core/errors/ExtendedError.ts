/**
 * default error with an object where error is thrown
 *
 * @public
 */
export class ExtendedError extends Error {
    /**
     * @public
     * @param target - object where error is thrown
     * @param error - description of error
     */
    public constructor(target: object, error: string) {
        super(`[${String(target)}] ${error}`);
    }
}

/**
 * function to throw a default error
 *
 * @public
 * @param target - object where error is thrown
 * @param error - description of error
 * @returns never
 */
export function throwDefault(target: object, error: string = "Error"): never {
    throw new ExtendedError(target, error);
}

/**
 * function to throw an error
 *
 * @public
 * @param error - instance of {@link Error}
 * @returns never
 */
export function throwError(error: Error): never {
    throw error;
}
