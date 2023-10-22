import {CoreObject, CoreReflect, InterfaceSymbol, IType, Nullable,} from "../src";
import {ICar, IExpensiveCar, MyCar, OtherCar, TheOtherCar} from "./CarExample";
import {EmptySuperClass} from "./classes/aLevel/EmptySuperClass";
import {EmptyChildOfEmptySuperClass} from "./classes/bLevel/EmptyChildOfEmptySuperClass";
import {EmptyChildOfEmptyChildOfEmptySuperClass} from "./classes/cLevel/EmptyChildOfEmptyChildOfEmptySuperClass";
import {ISomeInterface} from "./interfaces/ISomeInterface";

describe("Core Test", () => {

    it("test is primitive", () => {

        expect(CoreObject.isPrimitive({})).not.toBeTruthy();
        expect(CoreObject.isPrimitive("")).toBeTruthy();
        expect(CoreObject.isPrimitive("xxx")).toBeTruthy();
        expect(CoreObject.isPrimitive([])).not.toBeTruthy();
        expect(CoreObject.isPrimitive(0)).toBeTruthy();
        expect(CoreObject.isPrimitive(1)).toBeTruthy();
        expect(CoreObject.isPrimitive(undefined)).toBeTruthy();
        expect(CoreObject.isPrimitive(null)).toBeTruthy();
        expect(CoreObject.isPrimitive(false)).toBeTruthy();
        expect(CoreObject.isPrimitive(true)).toBeTruthy();
        expect(CoreObject.isPrimitive(Symbol.for("Symbol"))).toBeTruthy();
        expect(CoreObject.isPrimitive(() => {
            void (0);
        })).not.toBeTruthy();
    });

    it("test type", () => {
        const getType: <T>(type: IType<T>) => string = <T>(type: IType<T>): string => {
            if (CoreObject.isClass(type)) {
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

        expect(CoreObject.haveSameClass(car1, car2)).toBe(true);
        expect(CoreObject.haveSameClass(car1, car3)).toBe(false);
        expect(CoreObject.haveSameClass(car2, car3)).toBe(false);
    });

    it("should check if the given is a class or not", () => {
        const classInstance: OtherCar = new OtherCar();

        expect(CoreObject.isClass(OtherCar)).toBe(true);
        expect(CoreObject.isClass(classInstance)).toBe(false);

    });

    it("should return the objects class", () => {
        const otherCar: OtherCar = new OtherCar();
        const theOtherCar: TheOtherCar = new TheOtherCar();

        expect(CoreObject.classOf(otherCar)).toBe(OtherCar);
        expect(CoreObject.classOf(theOtherCar)).not.toBe(OtherCar);
        expect(CoreObject.classOf(theOtherCar)).toBe(TheOtherCar);

        expect(CoreReflect.getDescriptor(theOtherCar, "model")).toBeDefined();
        expect(CoreReflect.has(theOtherCar, "model")).toBe(true);
        expect(Reflect.has(theOtherCar, "model")).toBe(true);
        expect(CoreReflect.has(theOtherCar, "drive")).toBe(true);
        expect(Reflect.has(theOtherCar, "drive")).toBe(true);
        expect(CoreReflect.hasOwn(theOtherCar, "drive")).toBe(false);
        expect(CoreReflect.has(theOtherCar, "model1")).toBe(false);
        expect(Reflect.has(theOtherCar, "model1")).toBe(false);
        expect(CoreReflect.getOwner(theOtherCar, "drive")).toBe(OtherCar.prototype);

        expect(CoreReflect.has(TheOtherCar, "repair")).toBe(true);
        expect(Reflect.has(TheOtherCar, "repair")).toBe(true);
        expect(CoreReflect.getDescriptor(TheOtherCar, "repair")).toBeDefined();
        expect(CoreReflect.getOwner(TheOtherCar, "repair")).toBe(TheOtherCar);

        expect(CoreReflect.getDescriptor(theOtherCar, "drive")).toBeDefined();

    });

    it("should return true the given object is null or undefined", () => {
        const otherCar: OtherCar = new OtherCar();
        expect(CoreObject.isEmpty(otherCar)).toBe(false);

        /* tslint:disable:prefer-const*/
        const car: Nullable<OtherCar> = null;
        expect(CoreObject.isEmpty(car)).toBe(true);

        const car2: Nullable<OtherCar> = undefined;
        expect(CoreObject.isEmpty(car2)).toBe(true);
    });

    it("should throw error if uid is null or undefined", () => {
        let uid: never;
        expect(() => {
            InterfaceSymbol.for(uid);
        }).toThrowError(Error);
    });

    it("should validate super constructors", () => {
        expect(CoreObject.superClassOf(Object, true)).toBe(undefined);
        expect(CoreObject.superClassOf(Object, false)).toBe(undefined);
        expect(CoreObject.superClassOf(EmptySuperClass, false)).toBe(Object);
        expect(CoreObject.superClassOf(EmptySuperClass, true)).toBeUndefined();
        expect(CoreObject.superClassOf(EmptyChildOfEmptySuperClass)).toBe(EmptySuperClass);
        expect(CoreObject.superClassOf(EmptyChildOfEmptyChildOfEmptySuperClass)).toBe(EmptyChildOfEmptySuperClass);

    });

    it("should get superclass chain and exclude object", () => {
        expect(CoreObject.getSuperClassChain(Object).length).toBe(0);

        expect(CoreObject.getSuperClassChain(EmptySuperClass).length).toBe(1);
        expect(CoreObject.getSuperClassChain(EmptySuperClass)[0]).toBe(EmptySuperClass);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass).length).toBe(2);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass)[0]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass)[1]).toBe(EmptySuperClass);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass).length).toBe(3);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass)[0]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass)[2]).toBe(EmptySuperClass);

    });

    it("should get superclass chain and include object", () => {
        expect(CoreObject.getSuperClassChain(Object, false, false).length).toBe(1);
        expect(CoreObject.getSuperClassChain(Object, false, false)[0]).toBe(Object);

        expect(CoreObject.getSuperClassChain(EmptySuperClass, false, false).length).toBe(2);
        expect(CoreObject.getSuperClassChain(EmptySuperClass, false, false)[0]).toBe(EmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptySuperClass, false, false)[1]).toBe(Object);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, false, false).length).toBe(3);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, false, false)[0]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, false, false)[1]).toBe(EmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, false, false)[2]).toBe(Object);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false).length).toBe(4);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[0]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[2]).toBe(EmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, false, false)[3]).toBe(Object);

    });

    it("should get superclass chain reversed and include object", () => {
        expect(CoreObject.getSuperClassChain(Object, true, false).length).toBe(1);
        expect(CoreObject.getSuperClassChain(Object, true, false)[0]).toBe(Object);

        expect(CoreObject.getSuperClassChain(EmptySuperClass, true, false).length).toBe(2);
        expect(CoreObject.getSuperClassChain(EmptySuperClass, true, false)[1]).toBe(EmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptySuperClass, true, false)[0]).toBe(Object);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true, false).length).toBe(3);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true, false)[2]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true, false)[1]).toBe(EmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true, false)[0]).toBe(Object);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false).length).toBe(4);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[3]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[2]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[1]).toBe(EmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true, false)[0]).toBe(Object);

    });

    it("should get superclass chain reversed and exclude object", () => {
        expect(CoreObject.getSuperClassChain(Object, true).length).toBe(0);

        expect(CoreObject.getSuperClassChain(EmptySuperClass, true).length).toBe(1);
        expect(CoreObject.getSuperClassChain(EmptySuperClass, true)[0]).toBe(EmptySuperClass);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true).length).toBe(2);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptySuperClass, true)[0]).toBe(EmptySuperClass);

        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true).length).toBe(3);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true)[2]).toBe(EmptyChildOfEmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true)[1]).toBe(EmptyChildOfEmptySuperClass);
        expect(CoreObject.getSuperClassChain(EmptyChildOfEmptyChildOfEmptySuperClass, true)[0]).toBe(EmptySuperClass);

    });
});
