# hermodlog

Stupid simple logging for JS but with context for heavy log environments.

This is just to only pass along a single logger instance between modules and have a hierarchical way to sort and display such modules.


## Install

```bash
npm i hermodlog
```

## Usage

```js
import Logger from 'hermodlog';

logger = new Logger();
logger.log("Stuff");


contextLogger = logger.context('Node#4');

moduleLogger = contextLogger.module('myModule');
```

## API

### Logger

#### `new Logger(options)`
Create a new logger instance.

##### `context(name)`
Create a new context logger with the given name.

##### `module(name)`
Create a new module logger with the given name.

##### `log(message, level)`
Log a message with the given level.

##### `debug(message)`
Log a message with the debug level.

##### `info(message)`
Log a message with the info level.

##### `warn(message)`
Log a message with the warn level.

##### `error(message)`
Log a message with the error level.

##### `fatal(message)`
Log a message with the fatal level.


### License

MIT
