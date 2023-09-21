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
listenerLogger.error('Error')
listenerLogger.warn('Warn')
listenerLogger.info('Info')
listenerLogger.debug('debug')
listenerLogger.trace('trace')
