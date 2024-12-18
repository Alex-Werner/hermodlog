function safeStringify(obj, indent = 2, depth = 5, level = 0) {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) => {
            if (level > depth) return '...';
            if (typeof value === "object" && value !== null) {
                if (cache.includes(value)) return undefined;
                cache.push(value);
                level++;
            }
            return value;
        },
        indent
    );
    cache = null;
    return retVal;
}

export default function log(level, args, context) {
    const LOG_COLORS = context.LOG_COLORS;
    const colors = LOG_COLORS[level] || LOG_COLORS['info'];
    const date = context.date || new Date();
    let type = level.toUpperCase()[0];
    let message = `[${colors[0](date.toISOString())}]`;

    if (level !== 'log') {
        message += `[${colors[1](type)}]`;
    }

    if (context.contextName) {
        message += ` context: ${colors[2](context.contextName)}`;
        if (context.moduleName || context.listenerName || context.methodName) {
            message += ' |';
        }
    }
    
    if (context.moduleName) {
        message += ` module:${colors[3](context.moduleName)}`;
        if (context.listenerName || context.methodName) {
            message += ' |';
        }
    }
    
    if (context.listenerName) {
        message += ` listener: ${colors[4](context.listenerName)}`;
        if (context.methodName) {
            message += ' |';
        }
    }
    
    if (context.methodName) {
        message += ` method: ${colors[5](context.methodName)}`;
    }

    if (context.objectName) {
        message += ` Object[${colors[6](context.objectName)}]`;
    }

    message += ' ';

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const typeOfArg = typeof arg;
        let color;

        switch (typeOfArg) {
            case 'object':
                color = colors[6];
                if (!arg) {
                    message += `${color('null')}`;
                    break;
                }
                const constructorName = arg?.constructor?.name;
                if (constructorName === 'Object') {
                    message += `${color('Object(')}${color(safeStringify(arg, 2))}${color(')')}`;
                } else if (constructorName === 'Error') {
                    message += `${color(constructorName)}(${color(arg.message)})\n`;
                    if (arg.stack) {
                        const stackLines = arg.stack.split('\n');
                        // Skip first line as it contains the error message we already logged
                        for (let j = 1; j < stackLines.length; j++) {
                            message += `${color(stackLines[j].trim())}\n`;
                        }
                    }
                } else {
                    message += `${color(constructorName)}(${color(safeStringify(arg, 2))})`;
                }
                break;
            case 'string':
                color = colors[7];
                message += color(arg);
                break;
            case "function":
                color = colors[8];
                message += color(arg.toString());
                break;
            default:
                color = colors[9];
                message += color(String(arg));
                break;
        }
        
        if (i < args.length - 1) {
            message += ' ';
        }
    }

    context.history.push(message);
    if (context.history.length > 100) {
        context.history.shift();
    }

    context._log(message);
}
