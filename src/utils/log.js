function safeStringify(obj, indent = 2, depth = 5, level = 0) {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) => {
            if (level > depth) return '...';
            if (typeof value === 'bigint') {
                return value.toString();
            }
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


    const hasContext = !!context.contextName;
    const hasModule = !!context.moduleName;
    const hasHandler = !!context.handlerName;
    const hasListener = !!context.listenerName;
    const hasMethod = !!context.methodName;
    const hasSubmethod = !!context.submethodName;
    const hasSubmodule = !!context.submoduleName;
    const hasObject = !!context.objectName;

    if (hasContext) {
        message += ` context: ${colors[2](context.contextName)}`;
        const hasNext = hasModule || hasHandler || hasListener || hasMethod || hasSubmethod || hasSubmodule;
        if (hasNext) {
            message += ' |';
        }
    }
    
    if (hasModule) {
        message += ` module:${colors[3](context.moduleName)}`;
        const hasNext = hasHandler || hasListener || hasMethod || hasSubmethod || hasSubmodule;
        if (hasNext) {
            message += ' |';
        }
    }

    if (hasSubmodule) {
        message += ` submodule: ${colors[6](context.submoduleName)}`;
        const hasNext = hasHandler || hasListener || hasMethod || hasSubmethod;
        if (hasNext) {
            message += ' |';
        }
    }
    
    if (hasMethod) {
        message += ` method: ${colors[5](context.methodName)}`;
        const hasNext = hasHandler || hasSubmethod || hasSubmodule;
        if (hasNext) {
            message += ' |';
        }
    }

    if (hasSubmethod) {
        message += ` submethod: ${colors[6](context.submethodName)}`;
        const hasNext = hasHandler || hasListener || hasMethod || hasSubmodule;
        if (hasNext) {
            message += ' |';
        }
    }

    if (hasHandler) {
        message += ` handler: ${colors[4](context.handlerName)}`;
        const hasNext = hasListener || hasObject;
        if (hasNext) {
            message += ' |';
        }
    }

    if (hasListener) {
        message += ` listener: ${colors[4](context.listenerName)}`;
        const hasNext = hasObject;
        if (hasNext) {
            message += ' |';
        }
    }

    if (hasObject) {
        message += ` Object[${colors[6](context.objectName)}]`;
    }

    message += ' - ';

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
                // If the string contains [object Object], try to parse it as a potential object reference
                if (arg.includes('[object Object]')) {
                    // Extract the object from the current argument if it's a stringified object
                    try {
                        const potentialObj = JSON.parse(arg);
                        if (typeof potentialObj === 'object' && potentialObj !== null) {
                            message += `${color('Object(')}${color(safeStringify(potentialObj, 2))}${color(')')}`;
                        } else {
                            message += color(arg);
                        }
                    } catch (e) {
                        // If it's not a valid JSON, just display as is
                        message += color(arg);
                    }
                } else {
                    message += color(arg);
                }
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

    const historyLimit = context?.historyLimit;
    if (historyLimit) {
    context.history.push(message);
        if (context.history.length > historyLimit) {
            context.history.shift();
        }
    }

    context._log(message);
}
