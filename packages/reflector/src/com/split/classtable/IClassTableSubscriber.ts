import {IClassTableUpdate} from "./IClassTableUpdate";

/**
 * interface representing class table subscribers, if class table updated all subscribers receive update notification
 *
 * @public
 * @interface
 */
export interface IClassTableSubscriber {
    /**
     * method to receive class table updates
     *
     * @public
     * @param update - object sent to subscriber after class table update
     */
    onClassTableUpdate(update: IClassTableUpdate): void;
}
