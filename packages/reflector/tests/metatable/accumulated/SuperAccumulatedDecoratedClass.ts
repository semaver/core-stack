import {accumulated} from "../../common/metadata/AccumulatedDecorator";

@accumulated("constructor", 0)
export class SuperAccumulatedDecoratedClass {
    protected static _staticProperty: string = "aaaaa";
    protected _property: string = "aaaaa";

    // @multi("accessor isStatic full get")
    public static get accessorStaticFull(): string {
        return this._staticProperty;
    }

    @accumulated("accessor isStatic full set", 4)
    public static set accessorStaticFull(value: string) {
        void (value);
    }

    @accumulated("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return this._staticProperty;
    }

    @accumulated("accessor isStatic only set", 6)
    public static set accessorStaticSet(value: string) {
        void (value);
    }

    // @multi("accessor normal full get")
    public get accessorNormalFull(): string {
        return this._property;
    }

    @accumulated("accessor normal full set", 1)
    public set accessorNormalFull(_value: string) {
        void (0);
    }

    @accumulated("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return this._property;
    }

    @accumulated("accessor normal only set", 3)
    public set accessorNormalSet(_value: string) {
        void (0);
    }

    // ----------------------------

    @accumulated("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
    @accumulated("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;

    // ----------------------------

    @accumulated("method isStatic", 8)
    public static runStatic(@accumulated("param in isStatic method") param: string): number {
        void (param);
        return 0;
    }

    // ----------------------------
    @accumulated("prop normal defined", 9)
    public propertyDefNormal: number = 9;
    @accumulated("prop normal undefined", 9)
    public propertyUndefNormal?: number;
    @accumulated("prop normal null", 9)
    public propertyNullNormal: unknown = null;

    // ----------------------------

    public constructor(@accumulated("param in constructor", 10) param: string = "") {
        void (param);
    }

    @accumulated("method normal", 11)
    public runNormal(@accumulated("param in normal method", 12) param: string): number {
        void (param);
        return 0;
    }

    @accumulated("method normal with 1 default param", 13)
    public runNormalWith1DefaultParam(@accumulated("param 1 in normal method", 14) _param: string, defaultParam: number = 10): number {
        return defaultParam;
    }

    @accumulated("method normal with 2 param", 15)
    public runNormalWith2Param(@accumulated("param 1 in normal method", 16) _param: string, @accumulated("param 2 in normal method", 17) notDefaultParam: number): number {
        return notDefaultParam;
    }
}
