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

##### `context(name)`
Create a new context logger with the given context name.

##### `module(name)`
Create a new module logger with the given module name.

##### `listener(name)`
Create a new listener sublogger with the given listener name.

##### `method(name)`
Create a new method sublogger with the given method name.

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


#### constructor options
The `options` object can have the following properties:  

level: The default log level. Can be one of 'fatal', 'error', 'warn', 'info', 'debug', 'trace'.
colors: An object where each key is a log level and the value is an array of colors for different parts of the log message. The array should have the following order: [date color, type color, context color, module color, listener color, method color, object color, string color, function color, number/default color].
date: A date-compatible format

```js
{
    const options = {
        date: new Date('2024-01-01T00:01:01.001Z')},
        level: 'info', // Set the default log level
        colors: { // Set the colors for different parts of the log message
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
