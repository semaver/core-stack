import {BaseClass} from './BaseClass';
import {SomeType} from "./SomeType";
import {AnotherType} from "./AnotherType";
import {inject, postConstruct} from "./decorators";

// Assuming all demo classes are in the same directory

export class ChildClass extends BaseClass {
    private _someOtherProperty: SomeType | undefined;

    @inject(SomeType)
    public set someOtherProperty(value: SomeType | undefined) {
        this._someOtherProperty = value;
    }

    public constructor() {
        super(new SomeType(), new AnotherType());
    }

    @postConstruct()
    public initializeChild(): void {
        // Additional initialization logic specific to ChildClass
        console.log('ChildClass initialized');
    }
}
