import {IClass} from "@semaver/core";
import {
    ClassTableNames,
    ClassTableUpdateTypes,
    DecoratedElementType,
    Decorator,
    IClassTable,
    IClassTableRef,
    IClassTableSubscriber,
    IClassTableUpdate,
    metaclass,
    MetaclassDecorator,
    reflect,
    ReflectDecorator,
    Reflector
} from "../src";
import {MetaChildClass} from "./reflector/metaclasses/MetaChildClass";
import {MetaChildOfChildClass} from "./reflector/metaclasses/MetaChildOfChildClass";
import {MetaSuperClass} from "./reflector/metaclasses/MetaSuperClass";

describe("Reflector Class Table Test", () => {
    const storage: object = globalThis;

    beforeAll(() => {
        const classes: IClass<unknown>[] = [MetaSuperClass, MetaChildClass, MetaChildOfChildClass];
        expect(classes.length).toBe(3);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("test class table creation", () => {
        const classTable1: IClassTable = Reflector.getClassTable();
        const classTable2: IClassTable = Reflector.getClassTable();
        expect(classTable1.getClasses()).toBeInstanceOf(Set);
        expect(classTable2.getClasses()).toBeInstanceOf(Set);
        expect(classTable1.getClasses()).toBe(classTable2.getClasses());
        expect(Reflect.has(storage, ClassTableNames.CLASS_TABLE)).toBeTruthy();
    });

    it("test class table action", () => {
        const classTableRef: IClassTableRef = Reflect.get(storage, ClassTableNames.CLASS_TABLE) as IClassTableRef;
        const subscriber: IClassTableSubscriber = {
            onClassTableUpdate: function (update: IClassTableUpdate): void {
                void (update);
            },
        };

        expect(classTableRef._subscribers.size).toBe(0);
        Reflector.getClassTable().subscribe(subscriber);
        expect(classTableRef._subscribers.size).toBe(1);
        const subscriberSpy: jest.SpyInstance = jest.spyOn(subscriber, "onClassTableUpdate");

        expect(Reflector.getClassTable().getClasses().size).toBe(2);
        let syncHash: string = Reflector.getClassTable().getSyncHash();
        expect(subscriberSpy).toHaveBeenCalledTimes(0);


        Reflector.from(MetaChildOfChildClass).getConstructor().addDecorator(metaclass());
        expect(Reflector.getClassTable().getClasses().size).toBe(3);
        expect(Reflector.getClassTable().getSyncHash()).not.toBe(syncHash);
        syncHash = Reflector.getClassTable().getSyncHash();
        expect(subscriberSpy).toHaveBeenCalledTimes(1);
        expect(subscriberSpy).toHaveBeenCalledWith(expect.objectContaining<IClassTableUpdate>({
            type: ClassTableUpdateTypes.METADATA_ADDED,
            targetClass: MetaChildOfChildClass,
            decorator: expect.any(MetaclassDecorator) as Decorator,
            decoratedElement: {
                isStatic: false,
                name: "ctor",
                parameterIndex: -1,
                type: DecoratedElementType.CONSTRUCTOR,
            },
        }));

        expect(Reflector.from(MetaSuperClass).getProperty("unknownProperty").addDecorator(reflect())).toBeTruthy();
        expect(subscriberSpy).toHaveBeenCalledTimes(2);
        expect(subscriberSpy).toHaveBeenCalledWith(expect.objectContaining<IClassTableUpdate>({
            type: ClassTableUpdateTypes.METADATA_ADDED,
            targetClass: MetaSuperClass,
            decorator: expect.any(ReflectDecorator) as Decorator,
            decoratedElement: {
                isStatic: false,
                name: "unknownProperty",
                parameterIndex: -1,
                type: DecoratedElementType.PROPERTY,
            },
        }));
        expect(Reflector.from(MetaSuperClass).getConstructor().removeDecorator(MetaclassDecorator)).toBeTruthy();
        expect(Reflector.getClassTable().getClasses().size).toBe(3);
        expect(Reflector.getClassTable().getSyncHash()).toBe(syncHash);
        expect(subscriberSpy).toHaveBeenCalledTimes(3);
        expect(subscriberSpy).toHaveBeenCalledWith(expect.objectContaining<IClassTableUpdate>({
            type: ClassTableUpdateTypes.METADATA_REMOVED,
            targetClass: MetaSuperClass,
            decorator: expect.any(MetaclassDecorator) as Decorator,
            decoratedElement: {
                isStatic: false,
                name: "ctor",
                parameterIndex: -1,
                type: DecoratedElementType.CONSTRUCTOR,
            },
        }));

        expect(Reflector.from(MetaChildOfChildClass).getConstructor().removeDecorator(MetaclassDecorator)).toBeTruthy();
        expect(subscriberSpy).toHaveBeenCalledTimes(4);
        expect(subscriberSpy).toHaveBeenCalledWith(expect.objectContaining<IClassTableUpdate>({
            type: ClassTableUpdateTypes.METADATA_REMOVED,
            targetClass: MetaChildOfChildClass,
            decorator: expect.any(MetaclassDecorator) as Decorator,
            decoratedElement: {
                isStatic: false,
                name: "ctor",
                parameterIndex: -1,
                type: DecoratedElementType.CONSTRUCTOR,
            },
        }));
        expect(Reflector.getClassTable().getClasses().size).toBe(2);
        expect(Reflector.from(MetaSuperClass).getProperty("unknownProperty").removeDecorator(ReflectDecorator)).toBeTruthy();
        expect(subscriberSpy).toHaveBeenCalledTimes(5);
        expect(subscriberSpy).toHaveBeenCalledWith(expect.objectContaining<IClassTableUpdate>({
            type: ClassTableUpdateTypes.METADATA_REMOVED,
            targetClass: MetaSuperClass,
            decorator: expect.any(ReflectDecorator) as Decorator,
            decoratedElement: {
                isStatic: false,
                name: "unknownProperty",
                parameterIndex: -1,
                type: DecoratedElementType.PROPERTY,
            },
        }));
        expect(Reflector.getClassTable().getClasses().size).toBe(1);
        expect(Reflector.from(MetaSuperClass).getConstructor().addDecorator(metaclass())).toBeTruthy();
        expect(subscriberSpy).toHaveBeenCalledTimes(6);
        expect(subscriberSpy).toHaveBeenCalledWith(expect.objectContaining<IClassTableUpdate>({
            type: ClassTableUpdateTypes.METADATA_ADDED,
            targetClass: MetaSuperClass,
            decorator: expect.any(MetaclassDecorator) as Decorator,
            decoratedElement: {
                isStatic: false,
                name: "ctor",
                parameterIndex: -1,
                type: DecoratedElementType.CONSTRUCTOR,
            },
        }));
        expect(Reflector.getClassTable().getClasses().size).toBe(2);
        Reflector.getClassTable().unsubscribe(subscriber);
        expect(classTableRef._subscribers.size).toBe(0);
    });
});
