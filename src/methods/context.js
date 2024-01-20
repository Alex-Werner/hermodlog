import Logger from "../Logger.js";

export default function context(_context) {
    const logger = this.clone();
    logger.contextName = _context;
    logger._log = this._log.bind(logger);
    return logger;
}
