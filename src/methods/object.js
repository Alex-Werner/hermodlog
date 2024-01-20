import Logger from "../Logger.js";

export default function object(_context) {
    const logger = this.clone();
    logger.objectName = _context;
    logger._log = this._log.bind(logger);
    return logger;
}
