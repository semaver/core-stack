import {standard} from "../../common/metadata/StandardDecorator";

@standard("class", 0)
@standard("class", 0)
export class SuperNonMultiDecoratedClass {
    protected static _staticProperty: string = "aaaaa";
    protected _property: string = "aaaaa";

    // @standard("accessor isStatic full get")
    public static get accessorStaticFull(): string {
        return this._staticProperty;
    }

    @standard("accessor isStatic full set", 4)
    @standard("accessor isStatic full set", 4)
    public static set accessorStaticFull(_value: string) {
        return;
    }

    @standard("accessor isStatic only get", 5)
    @standard("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return this._staticProperty;
    }

    @standard("accessor isStatic only set", 6)
    @standard("accessor isStatic only set", 6)
    public static set accessorStaticSet(_value: string) {
        return;
    }

    // @standard("accessor normal full get")
    public get accessorNormalFull(): string {
        return this._property;
    }

    @standard("accessor normal full set", 1)
    @standard("accessor normal full set", 1)
    public set accessorNormalFull(_value: string) {
        return;
    }

    @standard("accessor normal only get", 2)
    @standard("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return this._property;
    }

    @standard("accessor normal only set", 3)
    @standard("accessor normal only set", 3)
    public set accessorNormalSet(_value: string) {
        return;
    }

    // ----------------------------

    @standard("prop isStatic undefined", 7)
    @standard("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
    @standard("prop isStatic defined", 7)
    @standard("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;

    // ----------------------------

    @standard("method isStatic", 8)
    @standard("method isStatic", 8)
    public static runStatic(@standard("param in isStatic method") _param: string): number {
        return 0;
    }

    // ----------------------------
    @standard("prop normal defined", 9)
    @standard("prop normal defined", 9)
    public propertyDefNormal: number = 9;
    @standard("prop normal undefined", 9)
    @standard("prop normal undefined", 9)
    public propertyUndefNormal?: number;
    @standard("prop normal null", 9)
    @standard("prop normal null", 9)
    public propertyNullNormal: unknown = null;

    // ----------------------------

    public constructor(@standard("param in constructor", 10) @standard("param in constructor", 10) _param: string = "") {
        return;
    }

    @standard("method normal", 11)
    @standard("method normal", 11)
    public runNormal(@standard("param in normal method", 12) @standard("param in normal method", 12) _param: string): number {
        return 0;
    }

    @standard("method normal with 1 default param", 13)
    @standard("method normal with 1 default param", 13)
    public runNormalWith1DefaultParam(@standard("param 1 in normal method", 14) @standard("param 1 in normal method", 14) _param: string, defaultParam: number = 10): number {
        return defaultParam;
    }

    @standard("method normal with 2 param", 15)
    @standard("method normal with 2 param", 15)
    public runNormalWith2Param(@standard("param 1 in normal method", 16) @standard("param 1 in normal method", 16) _param: string, @standard("param 2 in normal method", 17) @standard("param 2 in normal method", 17) notDefaultParam: number): number {
        return notDefaultParam;
    }
}
