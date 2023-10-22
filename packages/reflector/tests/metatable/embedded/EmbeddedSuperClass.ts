import {standard} from "../../common/metadata/StandardDecorator";

export class EmbeddedSuperClass {
    public constructor(@standard("inConstructor") inConstructor: boolean) {
        void (inConstructor);
    }

    public methodA(@standard("inMethod") inConstructor: boolean): void {
        void (inConstructor);
    }

    @standard("ofMethod")
    public methodB(@standard("inMethod") inConstructor: boolean): void {
        void (inConstructor);
    }
}
