/**
 * @public
 * @type DependencyId to define dependency id, can be string, number or symbol
 */
import {Empty} from "@semaver/core";

export type DependencyId = string | number | symbol;

/**
 * const used as default dependency id
 *
 * @public
 */
export const defaultDependencyId: DependencyId = "";

/**
 * variable used to customize default dependency id
 *
 * @public
 */
export let customDependencyId: Empty<DependencyId>;

/**
 * function to provide dependency id from given id, if not specified (null or undefined), custom default dependency id will be used, if custom is not provided, then framework default id
 *
 * @public
 * @param id - given dependency id
 * @returns dependency id given if defined, else custom default (defined globally by user) if defined, or system default (defined in library as constant)
 */
export function getDependencyId(id: Empty<DependencyId>): DependencyId {
    return id ?? customDependencyId ?? defaultDependencyId;
}

/**
 * function to set custom default dependency id
 *
 * @public
 * @param id - custom value of dependency id
 */
export function setDependencyId(id: DependencyId): void {
    customDependencyId = id;
}
