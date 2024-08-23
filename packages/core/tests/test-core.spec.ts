import {ICar, IExpensiveCar, MyCar, OtherCar, TheOtherCar} from "./CarExample";
import {EmptySuperClass} from "./classes/aLevel/EmptySuperClass";
import {EmptyChildOfEmptySuperClass} from "./classes/bLevel/EmptyChildOfEmptySuperClass";
import {EmptyChildOfEmptyChildOfEmptySuperClass} from "./classes/cLevel/EmptyChildOfEmptyChildOfEmptySuperClass";
import {ISomeInterface} from "./interfaces/ISomeInterface";
import {
    classOfObject,
    getObjectSuperClassChain,
    getPropertyDescriptor,
    getPropertyOwner,
    hasOwnProperty,
    hasProperty,
    haveObjectsSameClass,
    InterfaceSymbol,
    isObjectClass,
    isObjectEmpty,
    isObjectPrimitive,
    IType,
    Empty,
    superClassOfObject
} from "../src";

describe("Core Test", () => {

    it("test is primitive", () => {

        expect(isObjectPrimitive({})).not.toBeTruthy();
        expect(isObjectPrimitive("")).toBeTruthy();
        expect(isObjectPrimitive("xxx")).toBeTruthy();
        expect(isObjectPrimitive([])).not.toBeTruthy();
        expect(isObjectPrimitive(0)).toBeTruthy();
        expect(isObjectPrimitive(1)).toBeTruthy();
        expect(isObjectPrimitive(undefined)).toBeTruthy();
        expect(isObjectPrimitive(null)).toBeTruthy();
        expect(isObjectPrimitive(false)).toBeTruthy();
        expect(isObjectPrimitive(true)).toBeTruthy();
        expect(isObjectPrimitive(Symbol.for("Symbol"))).toBeTruthy();
        expect(isObjectPrimitive(() => {
            void (0);
        })).not.toBeTruthy();
    });

    it("test type", () => {
        const getType: <T>(type: IType<T>) => string = <T>(type: IType<T>): string => {
            if (isObjectClass(type)) {
                return "class";
            } else {
                return "interface";
            }
        };
        expect(getType(MyCar)).toBe("class");
        expect(getType(ISomeInterface)).toBe("interface");

        expect(InterfaceSymbol.for("ISomeInterface")).toBe(ISomeInterface);
        expect(InterfaceSymbol.for(Symbol.for("ISomeInterface"))).toBe(ISomeInterface);
    });

    it("should cast/assert one instance to a type/class", () => {
        const myCar: ICar = new MyCar();

        const overpricedCar: IExpensiveCar = myCar;
        overpricedCar.seatHeating = false;

        expect(overpricedCar).toBeInstanceOf(MyCar);
        expect(overpricedCar.sunroof).toBeUndefined();
    });

    it("should check two instances have same constructor or not", () => {

        const car1: ICar = {
            fuel: "gasoline",
            model: "coupe",
        };

        const car2: ICar = {
            fuel: "gasoline",
            model: "coupe",
        };

        const car3: MyCar = new MyCar("gasoline", "coupe");

        expect(haveObjectsSameClass(car1, car2)).toBe(true);
        expect(haveObjectsSameClass(car1, car3)).toBe(false);
        expect(haveObjectsSameClass(car2, car3)).toBe(false);
    });

    it("should check if the given is a class or not", () => {
        const classInstance: OtherCar = new OtherCar();

        expect(isObjectClass(OtherCar)).toBe(true);
        expect(isObjectClass(classInstance)).toBe(false);

    });

    it("should return the objects class", () => {
        const otherCar: OtherCar = new OtherCar();
        const theOtherCar: TheOtherCar = new TheOtherCar();

        expect(classOfObject(otherCar)).toBe(OtherCar);
        expect(classOfObject(theOtherCar)).not.toBe(OtherCar);
        expect(classOfObject(theOtherCar)).toBe(TheOtherCar);

        expect(getPropertyDescriptor(theOtherCar, "model")).toBeDefined();
        expect(hasProperty(theOtherCar, "model")).toBe(true);
        expect(Reflect.has(theOtherCar, "model")).toBe(true);
        expect(hasProperty(theOtherCar, "drive")).toBe(true);
        expect(Reflect.has(theOtherCar, "drive")).toBe(true);
        expect(hasOwnProperty(theOtherCar, "drive")).toBe(false);
        expect(hasProperty(theOtherCar, "model1")).toBe(false);
        expect(Reflect.has(theOtherCar, "model1")).toBe(false);
        expect(getPropertyOwner(theOtherCar, "drive")).toBe(OtherCar.prototype);

        expect(hasProperty(TheOtherCar, "repair")).toBe(true);
        expect(Reflect.has(TheOtherCar, "repair")).toBe(true);
        expect(getPropertyDescriptor(TheOtherCar, "repair")).toBeDefined();
        expect(getPropertyOwner(TheOtherCar, "repair")).toBe(TheOtherCar);

        expect(getPropertyDescriptor(theOtherCar, "drive")).toBeDefined();

    });

    it("should return true the given object is null or undefined", () => {
        const otherCar: OtherCar = new OtherCar();
        expect(isObjectEmpty(otherCar)).toBe(false);

        const car: Empty<OtherCar> = null;
        expect(isObjectEmpty(car)).toBe(true);

        const car2: Empty<OtherCar> = undefined;
        expect(isObjectEmpty(car2)).toBe(true);
    });

    it("should throw error if uid is null or undefined", () => {
        let uid: never;
        expect(() => {
            InterfaceSymbol.for(uid);
        }).toThrowError(Error);
    });

    it("should validate super constructors", () => {
        expect(superClassOfObject(Object, true)).toBe(undefined);
        expect(superClassOfObject(Object, false)).toBe(undefined);
        expect(superClassOfObject(EmptySuperClass, false)).toBe(Object);
        expect(superClassOfObject(EmptySuperClass, true)).toBeUndefined();
        expect(superClassOfObject(EmptyChildOfEmptySuperClass)).toBe(EmptySuperClass);
        expect(superClassOfObject(EmptyChildOfEmptyChildOfEmptySuperClass)).toBe(EmptyChildOfEmptySuperClass);

    });

    it("should get superclass chain and exclude object", () => {
        expect(getObjectSuperClassChain(Object).length).toBe(0);

        expect(getObjectSuperClassChain(EmptySuperClass).length).toBe(1);
        expect(getObjectSuperClassChain(EmptySuperClass)[0]).toBe(EmptySuperClass);

        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass).length).toBe(2);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass)[0]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass)[1]).toBe(EmptySuperClass);

        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass).length).toBe(3);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass)[0]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass)[2]).toBe(EmptySuperClass);

    });

    it("should get superclass chain and include object", () => {
        expect(getObjectSuperClassChain(Object, false, false).length).toBe(1);
        expect(getObjectSuperClassChain(Object, false, false)[0]).toBe(Object);

        expect(getObjectSuperClassChain(EmptySuperClass, false, false).length).toBe(2);
        expect(getObjectSuperClassChain(EmptySuperClass, false, false)[0]).toBe(EmptySuperClass);
        expect(getObjectSuperClassChain(EmptySuperClass, false, false)[1]).toBe(Object);

        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, false, false).length).toBe(3);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, false, false)[0]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, false, false)[1]).toBe(EmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, false, false)[2]).toBe(Object);

        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false).length).toBe(4);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[0]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[2]).toBe(EmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[3]).toBe(Object);

    });

    it("should get superclass chain reversed and include object", () => {
        expect(getObjectSuperClassChain(Object, true, false).length).toBe(1);
        expect(getObjectSuperClassChain(Object, true, false)[0]).toBe(Object);

        expect(getObjectSuperClassChain(EmptySuperClass, true, false).length).toBe(2);
        expect(getObjectSuperClassChain(EmptySuperClass, true, false)[1]).toBe(EmptySuperClass);
        expect(getObjectSuperClassChain(EmptySuperClass, true, false)[0]).toBe(Object);

        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true, false).length).toBe(3);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true, false)[2]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true, false)[1]).toBe(EmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true, false)[0]).toBe(Object);

        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false).length).toBe(4);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[3]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[2]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[1]).toBe(EmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[0]).toBe(Object);

    });

    it("should get superclass chain reversed and exclude object", () => {
        expect(getObjectSuperClassChain(Object, true).length).toBe(0);

        expect(getObjectSuperClassChain(EmptySuperClass, true).length).toBe(1);
        expect(getObjectSuperClassChain(EmptySuperClass, true)[0]).toBe(EmptySuperClass);

        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true).length).toBe(2);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptySuperClass, true)[0]).toBe(EmptySuperClass);

        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true).length).toBe(3);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true)[2]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(getObjectSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true)[0]).toBe(EmptySuperClass);

    });
});
