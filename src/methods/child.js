export default function child(_child) {
    const logger = this.clone();
    logger.childName = _child;
    logger._log = this._log.bind(logger);
    return logger;
}
