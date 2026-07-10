import {classOfObject} from "../extentions/CoreObject";

/**
 * class that extends the native {@link Error}, prefixing the given message with the class name
 * of the target object that raised it to produce a message of the form `[ClassName] error`.
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
        super(`[${classOfObject(target).name}] ${error}`);
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
