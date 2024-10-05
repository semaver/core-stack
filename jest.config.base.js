export const base = {
	transform: {
		"^.+\\.ts$": "ts-jest"
	},
	moduleFileExtensions: [
		"ts",
		"js",
	],
	collectCoverage: true,
	coverageReporters: ["html", "text"],
	verbose: true,
	maxWorkers: "0%",
};

export const packageBase = (packageJson) => {
	return {
		...base,
		displayName: packageJson.name,
		rootDir: "../..",
		testMatch: [`<rootDir>/packages/${packageJson.rawName}/**/*.spec.ts`],
		coverageDirectory: `<rootDir>/packages/${packageJson.rawName}/coverage/`,
		collectCoverage: false,
		collectCoverageFrom: [
			`<rootDir>/packages/${packageJson.rawName}/src/**`,
		],
	}
}

