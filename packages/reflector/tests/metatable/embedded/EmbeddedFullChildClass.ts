import {EmbeddedSuperClass} from "./EmbeddedSuperClass";
import {standard} from "../../common/metadata/StandardDecorator";

export class EmbeddedFullChildClass extends EmbeddedSuperClass {
    public constructor(@standard("inConstructor") inConstructor: boolean) {
        super(inConstructor);
    }

    public methodA(@standard("inMethod") inMethod: boolean): void {
        void (inMethod);
    }

    @standard("ofMethod")
    public methodB(@standard("inMethod") inMethod: boolean): void {
        void (inMethod);

    }
}
