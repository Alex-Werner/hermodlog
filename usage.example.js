import Logger from './src/Logger.js';

const logger = new Logger({
    level: 'trace',
});




const listenerLogger = logger.listener('onConnection')
const object = {
    x:42,
    y: {
        b:[1,2,3]
    },
    req:'getCar'
}

listenerLogger.log(`${object}`);

// listenerLogger.submethod('processIncomingMessage').log('Received from ws client',object)



// console.log({logger});

const el = logger.context('APIContext').module('Websocket Server').method('setListeners').listener('onMessage').submethod('processIncomingMessage')
el.log('Received from ws client');

el.log(1);
el.log(2);
el.log(3);
el.log(4);
el.log(5);
// Wait 5 seconds
await new Promise(resolve => setTimeout(resolve, 5000));
el.log(6);
el.log(7);
el.log(8);
el.log(9);
el.log(10);

console.log(el.getHistory(2,{fromDate: new Date('2025-10-08T02:52:20')}));


el.submodule('submodule1').handler('handler1').log('submodule1');