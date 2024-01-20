# hermodlog

[![npm version](https://badge.fury.io/js/hermodlog.svg)](https://badge.fury.io/js/hermodlog)

Stupid simple logging for JS but with context for heavy log environments.

This is just to only pass along a single logger instance between modules and have a hierarchical way to sort and display such modules.

<img width="1065" alt="image" src="https://github.com/Alex-Werner/hermodlog/assets/5849920/1df7e7dd-cf25-4ce3-872b-dab1288966e4">


## Install

```bash
npm i hermodlog
```

## Usage

```js
import Logger from 'hermodlog';

const logger = new Logger({
    level: 'debug', // Optional, default: 'info'
});
const contextLogger = logger.context('Node#42');
const moduleLogger = logger.module('WSServer');
moduleLogger.method('init').log("Initializing server...");
const listenerLogger = moduleLogger.listener('onMessage');
listenerLogger.debug("Message received!");
```

## API

### Logger

#### `new Logger(options)`
Create a new logger instance.

#### Level methods

##### `log(message, level)`
Log a message with the given level.

##### `debug(message)`
Log a message with the debug level.

##### `info(message)`
Log a message with the info level.

##### `warn(message)`
Log a message with the warn level.

##### `fatal(message)`
Log a message with the fatal level.

##### `error(message)`
Log a message with the error level.

##### `fatal(message)`
Log a message with the fatal level.

#### Context methods

##### `context(name)`
Create a new context logger with the given context name.

##### `module(name)`
Create a new module logger with the given module name.

##### `listener(name)`
Create a new listener sublogger with the given listener name.

##### `method(name)`
Create a new method sublogger with the given method name.

##### `child(name)`
Create a new child logger with the given child name.

##### `object(object)`
Create a new object logger with the given object.

#### Other methods

#### `clone(opts)`
Clone the logger. The `opts` object can have the following properties:
- keepHistory: Whether to keep the history of the logger. Default: `false` (unique falsy one).
- keepContext: Whether to keep the context of the logger. Default: `true`.
- keepModule: Whether to keep the module of the logger. Default: `true`.
- keepListener: Whether to keep the listener of the logger. Default: `true`.
- keepMethod: Whether to keep the method of the logger. Default: `true`.
- keepObject: Whether to keep the object of the logger. Default: `true`.
- keepChild: Whether to keep the child of the logger. Default: `true`.
- keepLevel: Whether to keep the level of the logger. Default: `true`.
- keepColors: Whether to keep the colors of the logger. Default: `true`.
- keepDate: Whether to keep the date of the logger. Default: `true`.

#### constructor options
The `options` object can have the following properties:  

##### `date`
A date-compatible format. Default: `YYYY-MM-DD HH:mm:ss.SSS`.

##### `level`
A default log level. Can be one of 'fatal', 'error', 'warn', 'info', 'debug', 'trace'. Default: `info`.

##### `history`
The history of the logger. Default: `[]`.

##### `contextName`
The context name of the logger. Default: `null`.

##### `moduleName`
The module name of the logger. Default: `null`.

##### `listenerName`
The listener name of the logger. Default: `null`.

##### `methodName`
The method name of the logger. Default: `null`.

##### `objectName`
The object name of the logger. Default: `null`.

##### `colors`
An object where each key is a log level and the value is an array of colors for different parts of the log message. The array should have the following order: [date color, type color, context color, module color, listener color, method color, object color, string color, function color, number/default color].

```js
{
    const options = {
        date: new Date('2024-01-01T00:01:01.001Z'),
        level: 'info', // Set the default log level
        colors: {
            // Set the colors for different parts of the log message
            fatal: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.magenta, chalk.white, chalk.blue, chalk.cyan],
            error: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.red, chalk.yellow, chalk.green, chalk.blue],
            warn: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.yellow, chalk.blue, chalk.magenta, chalk.red],
            info: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.blue, chalk.green, chalk.red, chalk.yellow],
            debug: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.green, chalk.red, chalk.yellow, chalk.blue],
            trace: [chalk.gray, chalk.red, chalk.blueBright, chalk.gray, chalk.cyan, chalk.yellow, chalk.magenta, chalk.yellow, chalk.blue, chalk.green],
        }
    };
    const logger = new Logger(options);
    
    logger.log('Hello World');
}
```

### License

MIT
