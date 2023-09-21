import Logger from "../Logger.js";

export default function  listener(_listener) {
    const logger = new Logger(this.date);
    logger.moduleName = this.moduleName;
    logger.contextName = this.contextName;
    logger.listenerName = _listener;
    logger._log = this._log.bind(logger);
    return logger;
}
