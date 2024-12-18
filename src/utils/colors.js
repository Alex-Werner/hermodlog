const ESC = '\x1b';

const createColorFn = (code) => (text) => `${ESC}[${code}m${text}${ESC}[0m`;

const colors = {
    gray: createColorFn('90'),
    red: createColorFn('31'),
    green: createColorFn('32'),
    yellow: createColorFn('33'),
    blue: createColorFn('34'),
    magenta: createColorFn('35'),
    cyan: createColorFn('36'),
    // Bright variants
    blueBright: createColorFn('94'),
};

export default colors; 