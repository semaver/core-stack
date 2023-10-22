import {multi} from "../../common/metadata/MultiDecorator";

@multi("class", 0)
@multi("class", 0)
export class SuperMultiDecoratedClass {

    // @multi("accessor isStatic full get")
    public static get accessorStaticFull(): string {
        return "aaaaa";
    }

    @multi("accessor isStatic full set", 4)
    @multi("accessor isStatic full set", 4)
    public static set accessorStaticFull(value: string) {
        void (value);
    }

    @multi("accessor isStatic only get", 5)
    @multi("accessor isStatic only get", 5)
    public static get accessorStaticGet(): string {
        return "aaaaa";
    }

    @multi("accessor isStatic only set", 6)
    @multi("accessor isStatic only set", 6)
    public static set accessorStaticSet(value: string) {
        void (value);
    }

    // @multi("accessor normal full get")
    public get accessorNormalFull(): string {
        return "aaaaa";
    }

    @multi("accessor normal full set", 1)
    @multi("accessor normal full set", 1)
    public set accessorNormalFull(value: string) {
        void (value);
    }

    @multi("accessor normal only get", 2)
    @multi("accessor normal only get", 2)
    public get accessorNormalGet(): string {
        return "aaaaa";
    }

    @multi("accessor normal only set", 3)
    @multi("accessor normal only set", 3)
    public set accessorNormalSet(value: string) {
        void (value);
    }

    // ----------------------------

    @multi("prop isStatic undefined", 7)
    @multi("prop isStatic undefined", 7)
    public static propertyUndefStatic: number;
    @multi("prop isStatic defined", 7)
    @multi("prop isStatic defined", 7)
    public static propertyDefStatic: number = 0;

    // ----------------------------

    @multi("method isStatic", 8)
    @multi("method isStatic", 8)
    public static runStatic(@multi("param in isStatic method") @multi("param in isStatic method") param: string): number {
        void (param);
        return 0;
    }

    // ----------------------------
    @multi("prop normal defined", 9)
    @multi("prop normal defined", 9)
    public propertyDefNormal: number = 9;
    @multi("prop normal undefined", 9)
    @multi("prop normal undefined", 9)
    public propertyUndefNormal?: number;
    @multi("prop normal null", 9)
    @multi("prop normal null", 9)
    public propertyNullNormal: unknown = null;

    // ----------------------------

    public constructor(@multi("param in constructor", 10) @multi("param in constructor", 10) param: string = "") {
        void (param);
    }

    @multi("method normal", 11)
    @multi("method normal", 11)
    public runNormal(@multi("param in normal method", 12) @multi("param in normal method", 12) param: string): number {
        void (param);
        return 0;
    }

    @multi("method normal with 1 default param", 13)
    @multi("method normal with 1 default param", 13)
    public runNormalWith1DefaultParam(@multi("param 1 in normal method", 14) @multi("param 1 in normal method", 14) param: string, defaultParam: number = 10): number {
        return defaultParam;
    }

    @multi("method normal with 2 param", 15)
    @multi("method normal with 2 param", 15)
    public runNormalWith2Param(@multi("param 1 in normal method", 16) @multi("param 1 in normal method", 16) param: string, @multi("param 2 in normal method", 17) @multi("param 2 in normal method", 17) notDefaultParam: number): number {
        return notDefaultParam;
    }
}
