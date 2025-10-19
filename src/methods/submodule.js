export default function submodule(_submodule) {
    const logger = this.clone();
    logger.submoduleName = _submodule;
    logger._log = this._log.bind(logger);
    return logger;
}
