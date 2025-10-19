export default function submethod(_submethod) {
    const logger = this.clone();
    logger.submethodName = _submethod;
    logger._log = this._log.bind(logger);
    return logger;
}
