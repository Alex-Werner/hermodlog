import Logger from './src/Logger.js';


const logger = new Logger({
    level: 'trace',
});
const contextLogger = logger.context('APIContext')
contextLogger.log('Started API');
const moduleLogger = contextLogger.module('Websocket Server')
moduleLogger.log('Started WSS');
const listenerLogger = moduleLogger.listener('onConnection')
listenerLogger.log('New connection');
const object = {
    x:42,
    y: {
        b:[1,2,3]
    },
    req:'getCar'
}
listenerLogger.method('processIncomingMessage').log('Received from ws client',object)

listenerLogger.log(()=>'This is a function that returns a string')
listenerLogger.log(1,2,3,4,5,6,7,8,9,10)

class Car {
    constructor(props) {
        this.name = props.name;
    }
};

const car = new Car({name: 'RSQ'});

listenerLogger.method('processIncomingMessage').log('Responding to client object:',car)
listenerLogger.error('Something happened while sending:',car)

listenerLogger.trace('Display me');
listenerLogger.level = 'error'
listenerLogger.trace('Do not display me trace on error');
listenerLogger.log('Do not display me log on error')
listenerLogger.error('Do display me')
listenerLogger.level = 'trace'
listenerLogger.error('Error',object)
listenerLogger.warn('Warn',object)
listenerLogger.info('Info',object)
listenerLogger.debug('debug',object)
listenerLogger.trace('trace',object)

const error = new Error('Something happened');
listenerLogger.error('Error',error)
listenerLogger.warn('Warn',error)
listenerLogger.info('Info',error)
listenerLogger.debug('debug',error)
listenerLogger.trace('trace',error)

