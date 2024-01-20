import chalk from "chalk";

const LOG_COLORS = {
    // [date color, type color, context color, module color, listener color, method color, object color, string color, function color, number/default color]
    debug: [chalk.gray, chalk.blue, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.blue, chalk.blue, chalk.blue, chalk.blue],
    error: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.red, chalk.red, chalk.red, chalk.red],
    fatal: [chalk.gray, chalk.magenta, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.magenta, chalk.magenta, chalk.magenta, chalk.magenta],
    info: [chalk.gray, chalk.green, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.green, chalk.green, chalk.green, chalk.green],
    trace: [chalk.gray, chalk.gray, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.gray, chalk.gray, chalk.gray, chalk.gray],
    warn: [chalk.gray, chalk.yellow, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.yellow, chalk.yellow, chalk.yellow, chalk.yellow],
}

export default LOG_COLORS;
