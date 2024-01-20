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
import object from "./methods/object.js";
class Logger {
    constructor(props = {}) {
        this.level = props.level ?? 'info';
        if (!LOG_LEVELS.hasOwnProperty(this.level)) {
            throw new Error(`Unknown log level ${this.level}`)
        }

        this.history = props.history ?? [];

        this.contextName = props.contextName ?? null;
        this.methodName = props.methodName ?? null;
        this.moduleName = props.moduleName ?? null;
        this.listenerName = props.listenerName ?? null;
        this.objectName = props.objectName ?? null;

        if (props.date) {
            this.date = props.date;
        }

        this.LOG_COLORS = (props.colors) ?? LOG_COLORS;
    }

    _log(message) {
        console.log(message)
    }

    clone(opts = {}) {
        const keepHistory = opts?.keepHistory ?? false;
        const keepLevel = opts?.keepLevel ?? true;
        const keepDate = opts?.keepDate ?? true;
        const keepColors = opts?.keepColors ?? true;
        const keepContext = opts?.keepContext ?? true;
        const keepMethod = opts?.keepMethod ?? true;
        const keepModule = opts?.keepModule ?? true;
        const keepListener = opts?.keepListener ?? true;
        const keepObject = opts?.keepObject ?? true;

        return new Logger({
            level: (keepLevel) ? this.level : opts.level ?? this.level,
            date: (keepDate) ? this.date : opts.date ?? null,
            history: keepHistory ? this.history : [],
            colors: (keepColors) ? this.LOG_COLORS : opts.colors ?? this.LOG_COLORS,
            contextName: (keepContext) ? this.contextName : opts.contextName ?? null,
            methodName: (keepMethod) ? this.methodName : opts.methodName ?? null,
            moduleName: (keepModule) ? this.moduleName : opts.moduleName ?? null,
            listenerName: (keepListener) ? this.listenerName : opts.listenerName ?? null,
            objectName: (keepObject) ? this.objectName : opts.objectName ?? null,
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
Logger.prototype.object = object;
Logger.prototype.module = module;
Logger.prototype.trace = trace;
Logger.prototype.warn = warn;
Logger.prototype.child = child;

export default Logger;
