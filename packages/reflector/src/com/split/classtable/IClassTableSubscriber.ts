import {IClassTableUpdate} from "./IClassTableUpdate";

/**
 * @public
 * @interface
 * @description -  interface representing class table subscribers, if class table updated all subscribers receive upate notification
 */
export interface IClassTableSubscriber {
    /**
     * @public
     * @method to receive class table updates
     * @param update - object sent to subscriber after class table update
     */
    onClassTableUpdate(update: IClassTableUpdate): void;
}