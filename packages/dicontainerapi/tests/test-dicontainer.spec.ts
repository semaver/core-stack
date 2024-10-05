import {defaultDependencyId, getDependencyId, setDependencyId} from "../src";

describe("Di Container API Test", () => {

    it("Test dependency Id", () => {
        expect(getDependencyId(undefined)).toBe(defaultDependencyId);
        expect(getDependencyId(null)).toBe(defaultDependencyId);
        expect(getDependencyId(0)).toBe(0);

        expect(getDependencyId(defaultDependencyId)).toBe(defaultDependencyId);
        expect(getDependencyId("some_id")).toBe("some_id");

        setDependencyId("customDependencyId");

        expect(getDependencyId(undefined)).toBe("customDependencyId");
        expect(getDependencyId(null)).toBe("customDependencyId");
    });
});
