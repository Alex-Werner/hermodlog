import LOG_LEVELS from "../LOG_LEVELS.js";
import chalk from "chalk";

export default function info(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['info']){
        return;
    }
    let _message = args[0];
    if(args.length > 1){
        _message = args.slice(0).join(' | ');
    }
    const date = this.date || new Date();
    let message = `[${chalk.gray(date.toISOString())}][${chalk.green('I')}]`;


    if(this.contextName){
        message += ` context: ${chalk.blueBright(this.contextName)} |`;
    }
    if(this.moduleName){
        message += ` module:${chalk.gray(this.moduleName)} |`;
    }
    if(this.listenerName){
        message += ` listener: ${chalk.cyan(this.listenerName)} |`;
    }
    if(this.methodName){
        message += ` method: ${chalk.yellow(this.methodName)} |`;
    }
    if(message.endsWith(' |')){
        message = message.slice(0, -1);
    }

    for(let i = 0; i < args.length; i++){

        const typeOfArg = typeof args[i];

        switch (typeOfArg){
            case 'object':
                const constructorName = args[i].constructor.name;
                message += ` ${chalk.green(`${constructorName}(`)}`
                if(constructorName === 'Error'){
                    message += chalk.green(JSON.stringify(args[i].message, null, 2))
                }
                message += chalk.green(JSON.stringify(args[i], null, 2))
                message += ` ${chalk.green(")")}`
                break;
            case 'string':
                message += chalk.green(args[i])
                break;
            case "function":
                message += chalk.green(args[i].toString())
                break;
            case "number":
            default:
                message += chalk.green(args[i])
                break;
        }

    }

    this.history.push(message);
    if(this.history.length > 100){
        this.history.shift();
    }

    this._log(message);
}
