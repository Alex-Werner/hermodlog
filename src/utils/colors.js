const ESC = '\x1b';

const createColorFn = (code) => (text) => `${ESC}[${code}m${text}${ESC}[0m`;

const colors = {
    black: createColorFn('30'),
    red: createColorFn('31'),
    green: createColorFn('32'),
    yellow: createColorFn('33'),
    blue: createColorFn('34'),
    magenta: createColorFn('35'),
    cyan: createColorFn('36'),
    white: createColorFn('37'),
    // Bright variants
    gray: createColorFn('90'),
    redBright: createColorFn('91'),
    greenBright: createColorFn('92'),
    yellowBright: createColorFn('93'),
    blueBright: createColorFn('94'),
    magentaBright: createColorFn('95'),
    cyanBright: createColorFn('96'),
    whiteBright: createColorFn('97'),
};

export default colors; 