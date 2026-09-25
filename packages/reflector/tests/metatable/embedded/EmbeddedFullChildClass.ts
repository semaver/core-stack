import {EmbeddedSuperClass} from "./EmbeddedSuperClass";
import {standard} from "../../common/metadata/StandardDecorator";

export class EmbeddedFullChildClass extends EmbeddedSuperClass {
    public constructor(@standard("inConstructor") inConstructor: boolean) {
        super(inConstructor);
    }

    public methodA(@standard("inMethod") _inMethod: boolean): void {
        return;
    }

    @standard("ofMethod")
    public methodB(@standard("inMethod") _inMethod: boolean): void {
        return;

    }
}
