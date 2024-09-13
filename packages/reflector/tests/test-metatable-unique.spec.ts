import {ChildUniqueConstrutorDecoratedClass} from "./metatable/unique/ChildUniqueConstrutorDecoratedClass";
import {
    ChildUniqueInstanceAccessorSetDecoratedClass
} from "./metatable/unique/ChildUniqueInstanceAccessorSetDecoratedClass";
import {
    ChildUniqueInstancePropertyDefinedDecoratedClass
} from "./metatable/unique/ChildUniqueInstancePropertyDefinedDecoratedClass";
import {
    ChildUniqueStaticAccessorGetDecoratedClass
} from "./metatable/unique/ChildUniqueStaticAccessorGetDecoratedClass";
import {ChildUniqueConstrutorArgsDecoratedClass} from "./metatable/unique/ChildUniqueConstrutorArgsDecoratedClass";
import {
    ChildUniqueInstanceAccessorGetDecoratedClass
} from "./metatable/unique/ChildUniqueInstanceAccessorGetDecoratedClass";
import {ChildUniqueStaticMethodDecoratedClass} from "./metatable/unique/ChildUniqueStaticMethodDecoratedClass";
import {
    ChildUniqueStaticAccessorSetDecoratedClass
} from "./metatable/unique/ChildUniqueStaticAccessorSetDecoratedClass";
import {
    ChildUniqueInstanceAccessorFullDecoratedClass
} from "./metatable/unique/ChildUniqueInstanceAccessorFullDecoratedClass";
import {ChildUniqueInstanceMethodDecoratedClass} from "./metatable/unique/ChildUniqueInstanceMethodDecoratedClass";
import {
    ChildUniqueInstancePropertyUndefinedDecoratedClass
} from "./metatable/unique/ChildUniqueInstancePropertyUndefinedDecoratedClass";
import {
    ChildUniqueStaticPropertyDefinedDecoratedClass
} from "./metatable/unique/ChildUniqueStaticPropertyDefinedDecoratedClass";
import {
    ChildUniqueInstanceMethodArgsDecoratedClass
} from "./metatable/unique/ChildUniqueInstanceMethodArgsDecoratedClass";
import {
    ChildUniqueStaticAccessorFullDecoratedClass
} from "./metatable/unique/ChildUniqueStaticAccessorFullDecoratedClass";
import {
    ChildUniqueStaticPropertyUndefinedDecoratedClass
} from "./metatable/unique/ChildUniqueStaticPropertyUndefinedDecoratedClass";
import {ChildUniqueStaticMethodArgsDecoratedClass} from "./metatable/unique/ChildUniqueStaticMethodArgsDecoratedClass";
import {testAllDescriptors} from "./helpers/test-regular-decorators-helpers";
import {SuperUniqueConstructorArgsDecoratedClass} from "./metatable/unique/SuperUniqueConstructorArgsDecoratedClass";
import {
    SuperUniqueInstanceAccessorGetDecoratedClass
} from "./metatable/unique/SuperUniqueInstanceAccessorGetDecoratedClass";
import {
    SuperUniqueInstanceAccessorFullDecoratedClass
} from "./metatable/unique/SuperUniqueInstanceAccessorFullDecoratedClass";
import {SuperUniqueConstructorDecoratedClass} from "./metatable/unique/SuperUniqueConstructorDecoratedClass";
import {
    SuperUniqueInstanceAccessorSetDecoratedClass
} from "./metatable/unique/SuperUniqueInstanceAccessorSetDecoratedClass";
import {
    SuperUniqueInstanceMethodArgsDecoratedClass
} from "./metatable/unique/SuperUniqueInstanceMethodArgsDecoratedClass";
import {
    SuperUniqueInstancePropertyUndefinedDecoratedClass
} from "./metatable/unique/SuperUniqueInstancePropertyUndefinedDecoratedClass";
import {
    SuperUniqueInstancePropertyDefinedDecoratedClass
} from "./metatable/unique/SuperUniqueInstancePropertyDefinedDecoratedClass";
import {
    SuperUniqueStaticAccessorSetDecoratedClass
} from "./metatable/unique/SuperUniqueStaticAccessorSetDecoratedClass";
import {
    SuperUniqueStaticAccessorFullDecoratedClass
} from "./metatable/unique/SuperUniqueStaticAccessorFullDecoratedClass";
import {
    SuperUniqueStaticPropertyUndefinedDecoratedClass
} from "./metatable/unique/SuperUniqueStaticPropertyUndefinedDecoratedClass";
import {SuperUniqueStaticMethodArgsDecoratedClass} from "./metatable/unique/SuperUniqueStaticMethodArgsDecoratedClass";
import {
    SuperUniqueStaticAccessorGetDecoratedClass
} from "./metatable/unique/SuperUniqueStaticAccessorGetDecoratedClass";
import {
    SuperUniqueStaticPropertyDefinedDecoratedClass
} from "./metatable/unique/SuperUniqueStaticPropertyDefinedDecoratedClass";
import {SuperUniqueInstanceMethodDecoratedClass} from "./metatable/unique/SuperUniqueInstanceMethodDecoratedClass";
import {SuperUniqueStaticMethodDecoratedClass} from "./metatable/unique/SuperUniqueStaticMethodDecoratedClass";

describe("Reflector API unique metadata", () => {

    const errorMessage: string = "collision";

    it("test children unique throws errors", () => {
        expect(() => {
            testAllDescriptors(ChildUniqueConstrutorArgsDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueConstrutorDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);

        expect(() => {
            testAllDescriptors(ChildUniqueInstanceAccessorFullDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueInstanceAccessorGetDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueInstanceAccessorSetDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueInstanceMethodArgsDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueInstanceMethodDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueInstancePropertyDefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueInstancePropertyUndefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).toThrow(errorMessage);

        expect(() => {
            testAllDescriptors(ChildUniqueStaticAccessorFullDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueStaticAccessorGetDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueStaticAccessorSetDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueStaticMethodArgsDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueStaticMethodDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueStaticPropertyDefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(ChildUniqueStaticPropertyUndefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
    });

    it("test super unique throws errors", () => {
        expect(() => {
            testAllDescriptors(SuperUniqueConstructorArgsDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueConstructorDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);

        expect(() => {
            testAllDescriptors(SuperUniqueInstanceAccessorFullDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueInstanceAccessorGetDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueInstanceAccessorSetDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueInstanceMethodArgsDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueInstanceMethodDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueInstancePropertyDefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueInstancePropertyUndefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);

        expect(() => {
            testAllDescriptors(SuperUniqueStaticAccessorFullDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueStaticAccessorGetDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueStaticAccessorSetDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueStaticMethodArgsDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueStaticMethodDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueStaticPropertyDefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
        expect(() => {
            testAllDescriptors(SuperUniqueStaticPropertyUndefinedDecoratedClass, 0, 0, 0, 0, 0);
        }).not.toThrow(errorMessage);
    });
});
