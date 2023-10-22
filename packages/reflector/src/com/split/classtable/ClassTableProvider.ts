import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {ClassTable} from "./ClassTable";
import {ClassTableNames} from "./ClassTableNames";
import {IClassTableRef} from "./IClassTableRef";
import {IClassTableSubscriber} from "./IClassTableSubscriber";

/**
 * @public
 * @class
 * @description - main responsibility is to provide access to class table as well as create storage for it
 */
export class ClassTableProvider {
    /**
     * @private
     * @readonly
     * @property classTable - class table instance [[ClassTable]], wrapper for class table reference
     */
    private readonly classTable: ClassTable;

    /**
     * @public
     * @constructor
     */
    public constructor() {
        let classTableRef: IClassTableRef;
        const storage: object = globalThis ?? Object;
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
            classTableRef = Reflect.get(storage, ClassTableNames.CLASS_TABLE);
        }

        this.classTable = new ClassTable(classTableRef);
    }

    /**
     * @public
     * @method to get class table
     * @return instance of class table [[ClassTable]]
     */
    public getClassTable(): ClassTable {
        return this.classTable;
    }
}
