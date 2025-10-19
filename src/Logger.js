import LOG_LEVELS from "./LOG_LEVELS.js";

import context from "./methods/context.js";
import debug from "./methods/debug.js";
import dir from "./methods/dir.js";
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
import submethod from "./methods/submethod.js";
import submodule from "./methods/submodule.js";
import handler from "./methods/handler.js";
import LOG_COLORS from "./LOG_COLORS.js";
import object from "./methods/object.js";
class Logger {
    constructor(props = {}) {
        Object.defineProperties(this, {
            LOG_COLORS: {
                value: props.colors ?? LOG_COLORS,
                writable: true,
                enumerable: false
            },
            history: {
                value: props.history ?? [],
                writable: true,
                enumerable: false
            },
            historyLimit: {
                value: props.historyLimit ?? 0,
                writable: true,
                enumerable: true
            },
            level: {
                value: props.level ?? 'info',
                writable: true,
                enumerable: true
            },
            contextName: {
                value: props.contextName ?? null,
                writable: true,
                enumerable: true
            },
            methodName: {
                value: props.methodName ?? null,
                writable: true,
                enumerable: true
            },
            moduleName: {
                value: props.moduleName ?? null,
                writable: true,
                enumerable: true
            },
            handlerName: {
                value: props.handlerName ?? null,
                writable: true,
                enumerable: true
            },
            listenerName: {
                value: props.listenerName ?? null,
                writable: true,
                enumerable: true
            },
            submoduleName: {
                value: props.submoduleName ?? null,
                writable: true,
                enumerable: true
            },
            submethodName: {
                value: props.submethodName ?? null,
                writable: true,
                enumerable: true
            },
            objectName: {
                value: props.objectName ?? null,
                writable: true,
                enumerable: true
            }
        });

        if (props.date) {
            Object.defineProperty(this, 'date', {
                value: props.date,
                writable: true,
                enumerable: false
            });
        }

        if (!LOG_LEVELS.hasOwnProperty(this.level)) {
            throw new Error(`Unknown log level ${this.level}`)
        }
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
        const keepSubmethod = opts?.keepSubmethod ?? true;
        const keepSubmodule = opts?.keepSubmodule ?? true;
        const keepListener = opts?.keepListener ?? true;
        const keepObject = opts?.keepObject ?? true;
        const keepHandler = opts?.keepHandler ?? true;
        const historyLimit = opts?.historyLimit ?? null;

        return new Logger({
            level: (keepLevel) ? this.level : opts.level ?? this.level,
            date: (keepDate) ? this.date : opts.date ?? null,
            history: keepHistory ? this.history : [],
            historyLimit: historyLimit ?? this.historyLimit,
            colors: (keepColors) ? this.LOG_COLORS : opts.colors ?? this.LOG_COLORS,
            contextName: (keepContext) ? this.contextName : opts.contextName ?? null,
            methodName: (keepMethod) ? this.methodName : opts.methodName ?? null,
            moduleName: (keepModule) ? this.moduleName : opts.moduleName ?? null,
            submoduleName: (keepSubmodule) ? this.submoduleName : opts.submoduleName ?? null,
            listenerName: (keepListener) ? this.listenerName : opts.listenerName ?? null,
            submethodName: (keepSubmethod) ? this.submethodName : opts.submethodName ?? null,
            objectName: (keepObject) ? this.objectName : opts.objectName ?? null,
            handlerName: (keepHandler) ? this.handlerName : opts.handlerName ?? null,
        })
    }

    getHistory(limit = 100, options = {}) {
        let history = this.history;

        // options.from Date: filter history from this date
        if (options.fromDate) {
            history = history.filter(item => {
                const date = item.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
                if (date) {
                    return new Date(date[0]) >= options.fromDate;
                }
                return false;
            });
        }

        if(options.toDate) {
            history = history.filter(item => {
                const date = item.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
                if (date) {
                    return new Date(date[0]) <= options.toDate;
                }
                return false;
            });
        }

        return history.slice(-limit);
    }

};

Logger.prototype.context = context;
Logger.prototype.debug = debug;
Logger.prototype.dir = dir;
Logger.prototype.error = error;
Logger.prototype.fatal = fatal;
Logger.prototype.info = info;
Logger.prototype.listener = listener;
Logger.prototype.log = log;
Logger.prototype.method = method;
Logger.prototype.object = object;
Logger.prototype.submethod = submethod;
Logger.prototype.submodule = submodule;
Logger.prototype.module = module;
Logger.prototype.trace = trace;
Logger.prototype.warn = warn;
Logger.prototype.child = child;
Logger.prototype.handler = handler;

export default Logger;
