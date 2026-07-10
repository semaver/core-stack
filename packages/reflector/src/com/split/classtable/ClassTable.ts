import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {IClassTableRef} from "./IClassTableRef";
import {IClassTable} from "./IClassTable";
import {IClassTableSubscriber} from "./IClassTableSubscriber";
import {IClassTableUpdate} from "./IClassTableUpdate";
import {IClass} from "@semaver/core";

/**
 * default {@link IClassTable} implementation backed by a shared {@link IClassTableRef}; exposes the
 * set of classes carrying their own metadata, the synchronization hash, and subscriber
 * (un)registration plus update notification.
 * @public
 */
export class ClassTable implements IClassTable {

    /**
     *
     * @private
     * @readonly
     * @property classTableRef - reference to class table
     */
    private readonly classTableRef: IClassTableRef;

    /**
     * @public
     * @param classTableRef - reference to class table
     */
    public constructor(classTableRef: IClassTableRef) {
        this.classTableRef = classTableRef;
    }

    /**
     * @inheritDoc
     */
    public getClasses(): ReadonlySet<IClass<object>> {
        return this.classTableRef._classes;
    }

    /**
     * method to get a collection of classes containing own metadata
     *
     * @public
     * @returns modifiable set of classes
     */
    public getWriteableClasses(): Set<IMetadataClass<object>> {
        return this.classTableRef._classes;
    }

    /**
     * @inheritDoc
     */
    public getSyncHash(): string {
        return this.classTableRef._sync_hash;
    }

    /**
     * method to set (overwrite) the class table synchronization hash; the hash value is generated
     * externally by the reflection engine and stored here whenever the class table changes (a metadata
     * class is added, updated with its own metadata, or removed), so consumers can detect changes via {@link getSyncHash}
     *
     * @public
     * @param hash - string of synchronization hash
     */
    public setSyncHash(hash: string): void {
        this.classTableRef._sync_hash = hash;
    }

    /**
     * @inheritDoc
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
     * method to notify subscribers about class table updates
     *
     * @public
     * @param update - update object containing information about updates
     * @returns instance of current class table
     */
    public notify(update: IClassTableUpdate): this {
        this.classTableRef._subscribers.forEach(subscriber => {
            subscriber.onClassTableUpdate(update);
        });
        return this;
    }
}
