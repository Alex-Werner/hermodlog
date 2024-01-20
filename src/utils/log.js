// src/utils/log.js
export default function log(level, args, context) {
    const LOG_COLORS = context.LOG_COLORS;
    const colors = LOG_COLORS[level] || LOG_COLORS['info'];
    const date = context.date || new Date();
    let type = level.toUpperCase()[0];
    let message = `[${colors[0](date.toISOString())}][${colors[1](type)}]`;

    if(level === 'log'){
        message = `[${colors[0](date.toISOString())}]`;
    }

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
                if(constructorName === 'Error'){
                    message += color(JSON.stringify(args[i].message, null, 2))
                }
                message += color(JSON.stringify(args[i], null, 2))
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
