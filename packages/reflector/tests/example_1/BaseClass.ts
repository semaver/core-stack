import {inject, named, optional, postConstruct} from "./decorators";
import {SomeType} from "./SomeType";
import {AnotherTypeInterface} from "./AnotherTypeInterface";
import {ThirdPartyClass} from "./ThirdPartyClass";

// Assuming all demo classes are in the same directory

export class BaseClass extends ThirdPartyClass{

    @inject(SomeType)
    @named('someProperty')
    public someProperty: SomeType | undefined;

    public constructor(
        @inject(SomeType) firstParam: SomeType,
        @inject(AnotherTypeInterface) @optional() secondParam?: AnotherTypeInterface
    ) {
        // handle firstParam
        // handle secondParam
        void firstParam;
        void secondParam;

        super();
    }

    @postConstruct()
    public initialize(): void {
        // Initialization logic after dependencies are injected
        console.log('BaseClass initialized');
    }
}
