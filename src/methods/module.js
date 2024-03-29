import Logger from "../Logger.js";

export default function module(_module) {
    const logger = this.clone();
    logger.moduleName = _module;
    logger._log = this._log.bind(logger);
    return logger;
}
