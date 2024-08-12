import {standard} from "../../common/metadata/StandardDecorator";

@standard("class", 0)
export class SuperDecoratedClass {
    private static _accessorStaticGet: string = "accessorStaticGet";
    protected _accessorNormalGet: string = "accessorNormalGet";

    @standard("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return this._accessorStaticGet;
    }

    @standard("accessor isStatic only set", 6)
    public static set accessorStaticSet(value: string) {
        void (value);
    }

    // @standard("accessor isStatic full get")
    public static get accessorStaticFull(): string {
        return SuperDecoratedClass._accessorStaticFull;
    }

    @standard("accessor isStatic full set", 4)
    public static set accessorStaticFull(value: string) {
        SuperDecoratedClass._accessorStaticFull = value;
    }

    @standard("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return this._accessorNormalGet;
    }

    @standard("accessor normal only set", 3)
    public set accessorNormalSet(value: string) {
        void (value);
    }

    // @standard("accessor normal full get")
    public get accessorNormalFull(): string {
        return this._accessorNormalFull;
    }

    @standard("accessor normal full set", 1)
    public set accessorNormalFull(value: string) {
        this._accessorNormalFull = value;
    }

    @standard("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
    @standard("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;

    // ----------------------------

    @standard("method isStatic", 8)
    public static runStatic(@standard("param in isStatic method") param: number): number {
        return param;
    }

    // ----------------------------
    private static _accessorStaticFull: string = "";

    // ----------------------------
    @standard("prop normal defined", 9)
    public propertyDefNormal: number = 9;
    @standard("prop normal undefined", 9)
    public propertyUndefNormal?: number;
    @standard("prop normal null", 9)
    public propertyNullNormal: unknown = null;

    private _accessorNormalFull: string = "";

    // ----------------------------

    public constructor(@standard("param in constructor", 10) param: string = "") {
        void (param);
    }

    @standard("method normal", 11)
    public runNormal(@standard("param in normal method", 12) param: number): number {
        return param;
    }

    @standard("method normal with 1 default param", 13)
    public runNormalWith1DefaultParam(@standard("param 1 in normal method", 14) _param: string, defaultParam: number = 10): number {
        return defaultParam;
    }

    @standard("method normal with 2 param", 15)
    public runNormalWith2Param(@standard("param 1 in normal method", 16) _param: string, @standard("param 2 in normal method", 17) notDefaultParam: number): number {
        return notDefaultParam;
    }
}
