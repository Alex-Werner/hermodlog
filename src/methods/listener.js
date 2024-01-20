import Logger from "../Logger.js";

export default function  listener(_listener) {
    const logger = this.clone();
    logger.listenerName = _listener;
    logger._log = this._log.bind(logger);
    return logger;
}
