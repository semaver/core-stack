import {base} from "./jest.config.base.js";

export default {
	...base,
	displayName: "@semaver",
	rootDir: "./",
	testMatch: [`<rootDir>/packages/**/*.spec.ts`],
	coverageDirectory: `<rootDir>/coverage/`,
	collectCoverageFrom: [
		`<rootDir>/packages/**/src/**`,
	],
};
