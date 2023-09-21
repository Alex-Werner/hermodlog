import chalk from "chalk";
import LOG_LEVELS from "../LOG_LEVELS.js";

export default function log(...args) {
    return this.info(...args);
}
