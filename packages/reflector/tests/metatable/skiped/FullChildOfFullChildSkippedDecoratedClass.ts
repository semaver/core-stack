import {FullChildSkippedDecoratedClass} from "./FullChildSkippedDecoratedClass";
import {skipped} from "../../common/metadata/SkippedDecorator";

@skipped("class", 0)
export class FullChildOfFullChildSkippedDecoratedClass extends FullChildSkippedDecoratedClass {
    protected static _staticProperty: string = "aaaaa";

    // @multi("accessor isStatic full get")
    public static get accessorStaticFull(): string {
        return this._staticProperty;
    }

    @skipped("accessor isStatic full set", 4)
    public static set accessorStaticFull(value: string) {
        void (value);
    }

    @skipped("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return this._staticProperty;
    }

    @skipped("accessor isStatic only set", 6)
    public static set accessorStaticSet(value: string) {
        void (value);
    }

    // @multi("accessor normal full get")
    public get property(): string {
        return this._property;
    }

    @skipped("accessor normal full set", 1)
    public set property(value: string) {
        void (value);
    }

    @skipped("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return this._property;
    }

    @skipped("accessor normal only set", 3)
    public set accessorNormalSet(value: string) {
        void (value);
    }

    // ----------------------------

    @skipped("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
    @skipped("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;

    // ----------------------------

    @skipped("method isStatic", 8)
    public static runStatic(@skipped("param in isStatic method") param: string): number {
        void (param);
        return 0;
    }

    // ----------------------------
    @skipped("prop normal defined", 9)
    public propertyDefNormal: number = 9;
    @skipped("prop normal undefined", 9)
    public propertyUndefNormal?: number;
    @skipped("prop normal null", 9)
    public propertyNullNormal: unknown = null;

    // ----------------------------

    public constructor(@skipped("param in constructor", 10) param: string = "") {
        super(param);
    }

    @skipped("method normal", 11)
    public runNormal(@skipped("param in normal method", 12)  param: string): number {
        void (param);
        return 0;
    }

    @skipped("method normal with 1 default param", 13)
    public runNormalWith1DefaultParam(@skipped("param 1 in normal method", 14) _param: string, defaultParam: number = 10): number {
        return defaultParam;
    }

    @skipped("method normal with 2 param", 15)
    public runNormalWith2Param(@skipped("param 1 in normal method", 16) _param: string, @skipped("param 2 in normal method", 17) notDefaultParam: number): number {
        return notDefaultParam;
    }
}
