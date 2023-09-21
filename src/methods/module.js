import Logger from "../Logger.js";

export default function   module(_module) {
    const logger = new Logger(this.date);
    logger.methodName = this.methodName;
    logger.moduleName = _module;
    logger.contextName = this.contextName;
    logger.listenerName = this.listenerName;

    logger._log = this._log.bind(logger);
    return logger;
}
