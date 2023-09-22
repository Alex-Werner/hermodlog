import Logger from "../Logger.js";

export default function  method(_method) {
    const logger = this.clone();
    logger.moduleName = this.moduleName;
    logger.contextName = this.contextName;
    logger.listenerName = this.listenerName;
    logger.methodName = _method;
    logger._log = this._log.bind(logger);
    return logger;
}
