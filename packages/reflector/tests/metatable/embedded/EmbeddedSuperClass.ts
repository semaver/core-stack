import {standard} from "../../common/metadata/StandardDecorator";

export class EmbeddedSuperClass {
    public constructor(@standard("inConstructor") _inConstructor: boolean) {
        return;
    }

    public methodA(@standard("inMethod") _inConstructor: boolean): void {
        return;
    }

    @standard("ofMethod")
    public methodB(@standard("inMethod") _inConstructor: boolean): void {
        return;
    }
}
