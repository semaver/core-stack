import packageJson from "./package.json" assert {type: "json"};
import {packageBase} from "../../jest.config.base.js";

export default packageBase(packageJson);
