export default function handler(_handler) {
    const logger = this.clone();
    logger.handlerName = _handler;
    logger._log = this._log.bind(logger);
    return logger;
}
