import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {IClassTableRef} from "./IClassTableRef";
import {IClassTable} from "./IClassTable";
import {IClassTableSubscriber} from "./IClassTableSubscriber";
import {IClassTableUpdate} from "./IClassTableUpdate";

/**
 * @public
 * @class
 * @implements [[IClassTable]]
 * @description class wrapper for class table reference
 */
export class ClassTable implements IClassTable {

    /**
     *
     * @private
     * @readonly
     * @property classTableRef - reference to class table [[IClassTableRef]]
     */
    private readonly classTableRef: IClassTableRef;

    /**
     * @public
     * @constructor
     * @param classTableRef - reference to class table [[IClassTableRef]]
     */
    public constructor(classTableRef: IClassTableRef) {
        this.classTableRef = classTableRef;
    }

    /**
     * @inheritDoc
     */
    public getClasses(): ReadonlySet<IMetadataClass<unknown>> {
        return this.classTableRef._classes;
    }

    /**
     * @public
     * @method to get collection of classes containing own metadata
     * @return modifiable set of classes
     */
    public getWriteableClasses(): Set<IMetadataClass<unknown>> {
        return this.classTableRef._classes;
    }

    /**
     * @inheritDoc
     */
    public getSyncHash(): string {
        return this.classTableRef._sync_hash;
    }

    /**
     * @public
     * @method to set synchronisation hash
     * @param hash - string of synchronisation hash
     */
    public setSyncHash(hash: string): void {
        this.classTableRef._sync_hash = hash;
    }

    /**
     * @inheritDoc
     * @param subscribers
     */
    public subscribe(...subscribers: IClassTableSubscriber[]): this {
        subscribers.forEach(subscriber => this.classTableRef._subscribers.add(subscriber));
        return this;
    }

    /**
     * @inheritDoc
     */
    public unsubscribe(...subscribers: IClassTableSubscriber[]): this {
        subscribers.forEach(subscriber => this.classTableRef._subscribers.delete(subscriber));
        return this;
    }

    /**
     * @public
     * @method to notify subscribers about class table updates
     * @param update - update object containing information about updates [[IClassTableUpdate]]
     * @return instance of current class table
     */
    public notify(update: IClassTableUpdate): this {
        this.classTableRef._subscribers.forEach(subscriber => {
            subscriber.onClassTableUpdate(update);
        });
        return this;
    }
}
