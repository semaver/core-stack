import {IMetadataClass} from "../metatable/classes/IMetadataClass";
import {ClassTableProtocolMismatchError} from "../errors/ClassTableProtocolMismatchError";
import {ClassTable} from "./ClassTable";
import {ClassTableNames, CLASS_TABLE_PROTOCOL_VERSION} from "./ClassTableNames";
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
     * @param storage - object that holds the shared class table under the
     * cross-realm class table symbol; defaults to `globalThis` so every library
     * copy rendezvous on one table. Injectable primarily for testing the
     * protocol-version handling in isolation from the process-global table.
     */
    public constructor(storage: object = globalThis) {
        let classTableRef: IClassTableRef;
        if (!Reflect.has(storage, ClassTableNames.CLASS_TABLE)) {
            classTableRef = {
                _protocol_version: CLASS_TABLE_PROTOCOL_VERSION,
                _sync_hash: "",
                _classes: new Set<IMetadataClass<object>>(),
                _subscribers: new Set<IClassTableSubscriber>(),
            };
            Reflect.defineProperty(storage, ClassTableNames.CLASS_TABLE, {
                configurable: false,
                enumerable: false,
                value: classTableRef,
                writable: false,
            });
        } else {
            classTableRef = Reflect.get(storage, ClassTableNames.CLASS_TABLE) as IClassTableRef;
            if (classTableRef._protocol_version !== CLASS_TABLE_PROTOCOL_VERSION) {
                // another library copy created the global class table using an
                // incompatible storage format; fail fast instead of silently
                // reading a layout this copy may not understand (which could
                // otherwise corrupt the shared registry or throw obscurely later).
                throw new ClassTableProtocolMismatchError(
                    this,
                    classTableRef._protocol_version,
                    CLASS_TABLE_PROTOCOL_VERSION,
                );
            }
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
