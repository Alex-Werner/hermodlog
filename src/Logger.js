import LOG_LEVELS from "./LOG_LEVELS.js";

import context from "./methods/context.js";
import debug from "./methods/debug.js";
import error from "./methods/error.js";
import info from "./methods/info.js";
import listener from "./methods/listener.js";
import log from "./methods/log.js";
import method from "./methods/method.js";
import module from "./methods/module.js";
import trace from "./methods/trace.js";
import warn from "./methods/warn.js";
import fatal from "./methods/fatal.js";
import child from "./methods/child.js";

import LOG_COLORS from "./LOG_COLORS.js";
class Logger {
    constructor(props = {}) {
        this.level = props.level ?? 'info';
        if (!LOG_LEVELS.hasOwnProperty(this.level)) {
            throw new Error(`Unknown log level ${this.level}`)
        }

        this.history = [];

        this.contextName = null
        this.methodName = null
        this.moduleName = null
        this.listenerName = null
        if (props.date) {
            this.date = props.date;
        }

        this.LOG_COLORS = (props.colors) ?? LOG_COLORS;
    }

    _log(message) {
        console.log(message)
    }

    clone() {
        return new Logger({
            level: this.level,
            date: this.date,
        })
    }

};

Logger.prototype.context = context;
Logger.prototype.debug = debug;
Logger.prototype.error = error;
Logger.prototype.fatal = fatal;
Logger.prototype.info = info;
Logger.prototype.listener = listener;
Logger.prototype.log = log;
Logger.prototype.method = method;
Logger.prototype.module = module;
Logger.prototype.trace = trace;
Logger.prototype.warn = warn;
Logger.prototype.child = child;

export default Logger;
