import colors from './utils/colors.js';

const LOG_COLORS = {
    // [date color, type color, context color, module color, listener color, method color, object color, string color, function color, number/default color]
    debug: [colors.gray, colors.blue, colors.blueBright, colors.gray, colors.cyan, colors.yellow, colors.blue, colors.blue, colors.blue, colors.blue],
    error: [colors.gray, colors.red, colors.blueBright, colors.gray, colors.cyan, colors.yellow, colors.red, colors.red, colors.red, colors.red],
    fatal: [colors.gray, colors.magenta, colors.blueBright, colors.gray, colors.cyan, colors.yellow, colors.magenta, colors.magenta, colors.magenta, colors.magenta],
    info: [colors.gray, colors.green, colors.blueBright, colors.gray, colors.cyan, colors.yellow, colors.green, colors.green, colors.green, colors.green],
    trace: [colors.gray, colors.gray, colors.blueBright, colors.gray, colors.cyan, colors.yellow, colors.gray, colors.gray, colors.gray, colors.gray],
    warn: [colors.gray, colors.yellow, colors.blueBright, colors.gray, colors.cyan, colors.yellow, colors.yellow, colors.yellow, colors.yellow, colors.yellow],
}

export default LOG_COLORS;
