import LOG_LEVELS from "../LOG_LEVELS.js";
import chalk from "chalk";

export default function trace(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['trace']){
        return;
    }
    let _message = args[0];
    if(args.length > 1){
        _message = args.slice(0).join(' | ');
    }
    const date = this.date || new Date();
    let message = `[${chalk.gray(date.toISOString())}][${chalk.grey('T')}]`;


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
        if(typeof args[i] === 'object'){
            const constructorName = args[i].constructor.name;
            message += ` ${chalk.grey(`${constructorName}(`)}`
            message += chalk.grey(JSON.stringify(args[i], null, 2))
            message += ` ${chalk.grey(")")}`
        }
        if(typeof args[i] === 'string'){
            message += chalk.grey(args[i])
        }
    }

    this.history.push(message);
    if(this.history.length > 100){
        this.history.shift();
    }

    this._log(message);
}