function safeStringify(obj, indent = 2, depth = 5, level = 0) {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) => {
            if (level > depth) return '...';
            if (typeof value === "object" && value !== null) {
                if (cache.includes(value)) return undefined; // Duplicate reference found, discard key
                cache.push(value); // Store value in our collection
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
    let message = `[${colors[0](date.toISOString())}][${colors[1](type)}]`;

    if(level === 'log'){
        message = `[${colors[0](date.toISOString())}]`;
    }


    // TODO: It would be neat to just have a single parents array that would be used
    //  to generate the context string.
    if(context.contextName){
        message += ` context: ${colors[2](context.contextName)} |`;
    }
    if(context.moduleName){
        message += ` module:${colors[3](context.moduleName)} |`;
    }
    if(context.listenerName){
        message += ` listener: ${colors[4](context.listenerName)} |`;
    }
    if(context.methodName){
        message += ` method: ${colors[5](context.methodName)} |`;
    }
    if(context.objectName){
        message += ` Object[${colors[6](context.objectName)}] |`;
    }

    if(message.endsWith(' |')){
        message = message.slice(0, -1);
    }

    for(let i = 0; i < args.length; i++){
        const typeOfArg = typeof args[i];
        let color;
        switch (typeOfArg){
            case 'object':
                color = colors[6]; // object color
                const constructorName = args[i].constructor.name;
                message += ` ${color(`${constructorName}(`)}`
                try {
                    if(constructorName === 'Error'){
                        message += color(safeStringify(args[i].message, 3, 4))
                    }
                    message += color(safeStringify(args[i], 3, 4))
                } catch (err) {
                    // Probably a circular reference
                    message += color(args[i].toString())
                }

                message += ` ${color(")")}`
                break;
            case 'string':
                color = colors[7]; // string color
                message += color(args[i])
                break;
            case "function":
                color = colors[8]; // function color
                message += color(args[i].toString())
                break;
            case "number":
            default:
                color = colors[9]; // number/default color
                message += color(args[i])
                break;
        }
    }

    context.history.push(message);
    if(context.history.length > 100){
        context.history.shift();
    }

    context._log(message);
}
