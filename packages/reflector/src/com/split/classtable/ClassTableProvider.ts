import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {ClassTable} from "./ClassTable";
import {ClassTableNames} from "./ClassTableNames";
import {IClassTableRef} from "./IClassTableRef";
import {IClassTableSubscriber} from "./IClassTableSubscriber";

/**
 *  main responsibility is to provide access to class table as well as create storage for it
 *
 * @public
 */
export class ClassTableProvider {
    /**
     * @private
     * @readonly
     * @property classTable - class table instance, wrapper for class table reference
     */
    private readonly classTable: ClassTable;

    /**
     * @public
     */
    public constructor() {
        let classTableRef: IClassTableRef;
        const storage: object = globalThis;
        if (!Reflect.has(storage, ClassTableNames.CLASS_TABLE)) {
            classTableRef = {
                _sync_hash: "",
                _classes: new Set<IMetadataClass<unknown>>(),
                _subscribers: new Set<IClassTableSubscriber>(),
            };
            Reflect.defineProperty(storage, ClassTableNames.CLASS_TABLE, {
                configurable: false,
                enumerable: true,
                value: classTableRef,
                writable: false,
            });
        } else {
            classTableRef = Reflect.get(storage, ClassTableNames.CLASS_TABLE) as IClassTableRef;
        }

        this.classTable = new ClassTable(classTableRef);
    }

    /**
     * method to get class table
     *
     * @public
     * @returns instance of class table
     */
    public getClassTable(): ClassTable {
        return this.classTable;
    }
}
