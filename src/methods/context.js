import Logger from "../Logger.js";

export default function context(_context) {
    const logger = new Logger(this.date);
    logger.contextName = _context;
    logger.methodName = this.methodName;
    logger.moduleName = this.moduleName;
    logger.listenerName = this.listenerName;

    logger._log = this._log.bind(logger);
    return logger;
}
