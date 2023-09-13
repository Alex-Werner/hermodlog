import chalk from 'chalk';
export default class Logger {
    constructor(_date, level = 'info') {

        this.level = level;

        this.history = [];

        this.contextName = null
        this.methodName = null
        this.moduleName = null
        this.listenerName = null
        if(_date){
            this._date = _date;
        }
    }

    context(_context) {
        const logger = new Logger(this._date);
        logger.contextName = _context;
        logger.methodName = this.methodName;
        logger.moduleName = this.moduleName;
        logger.listenerName = this.listenerName;

        logger._log = this._log.bind(logger);
        return logger;
    }
    module(_module) {
        const logger = new Logger(this._date);
        logger.methodName = this.methodName;
        logger.moduleName = _module;
        logger.contextName = this.contextName;
        logger.listenerName = this.listenerName;

        logger._log = this._log.bind(logger);
        return logger;
    }
    listener(_listener) {
        const logger = new Logger(this._date);
        logger.moduleName = this.moduleName;
        logger.contextName = this.contextName;
        logger.listenerName = _listener;
        logger._log = this._log.bind(logger);
        return logger;
    }
    method(_method) {
        const logger = new Logger(this._date);
        logger.moduleName = this.moduleName;
        logger.contextName = this.contextName;
        logger.listenerName = this.listenerName;
        logger.methodName = _method;
        logger._log = this._log.bind(logger);
        return logger;
    }
    _log(message) {
        console.log(message)
    }

    log(...args) {
        let _message = args[0];
        if(args.length > 1){
            _message = args.slice(0).join(' | ');
        }
        const date = this._date || new Date();
        let message = `[${chalk.gray(date.toISOString())}]`;


        if(this.contextName){
            message += ` context: ${chalk.blueBright(this.contextName)} |`;
        }
        if(this.moduleName){
            message += ` module:${chalk.gray(this.moduleName)} |`;
        }
        if(this.listenerName){
            message += ` listener: ${chalk.red(this.listenerName)} |`;
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
                message += ` ${chalk.yellow(`${constructorName}(`)}`
                message += chalk.yellow(JSON.stringify(args[i], null, 2))
                message += ` ${chalk.yellow(")")}`
            }
            if(typeof args[i] === 'string'){
                message += chalk.green(args[i])
            }
        }


        // // If message is an object, we put it on a new line
        // if(typeof _message === 'object'){
        //     message += ' Object'
        //     message += '\n'+JSON.stringify(_message, null, 2)
        // } else{
        //     message += ' : '+ _message
        // }

        this.history.push(message);
        if(this.history.length > 100){
            this.history.shift();
        }

        this._log(message);
    }
    info(message) {
        this.log(message);
    }
    debug(message) {
        this.log(message);
    }
    trace(message) {
        if(this.level === 'trace')
        {
            this.log(message);
        }
    }
    error(_message) {
        const date = this._date || new Date();
        let message = `[${chalk.gray(date.toISOString())}]`;

        if(this.moduleName){
            message += ` - m=${chalk.blue(this.moduleName)}`;
        }
        if(this.contextName){
            message += ` - c=${chalk.green(this.contextName)}`;
        }

        message += ` : ${chalk.red(_message)}`

        this.history.push(message);
        if(this.history.length > 100){
            this.history.shift();
        }
        this._log(message);
    }
    warn(message) {
        this.log(message);
    }
};
