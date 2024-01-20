import {assert, describe, expect, it} from 'vitest'
import Logger from "./Logger.js";

describe('Logger', () => {
    let silentLogger
    let silentModuleLogger
    it('should create an logger', () => {
        silentLogger = new Logger({date:new Date('2023-07-29T01:38:00.482Z')});
        silentLogger._log = () => {}
        assert.equal(silentLogger.history.length, 0)
        silentLogger.log('Hello');
        assert.equal(silentLogger.history.length, 1)
        assert.equal(silentLogger.history[0], '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[39m]\u001b[32mHello\u001b[39m')
    })
    it('should create an logger with module', () => {
        silentModuleLogger = silentLogger.module('test-module')
        silentModuleLogger.log('Hello');
        assert.equal(silentModuleLogger.history.length, 1)
        assert.equal(silentModuleLogger.history[0], "[\u001b[90m2023-07-29T01:38:00.482Z\u001b[39m] module:\u001b[90mtest-module\u001b[39m \u001b[32mHello\u001b[39m")
    })
    it('should create an logger with context', () => {
        const silentContextLogger = silentModuleLogger.context('test-context')
        silentContextLogger.log('Hello');
        assert.equal(silentContextLogger.history.length, 1)
        assert.equal(silentContextLogger.history[0], "[\u001b[90m2023-07-29T01:38:00.482Z\u001b[39m] context: \u001b[94mtest-context\u001b[39m | module:\u001b[90mtest-module\u001b[39m \u001b[32mHello\u001b[39m")
    })
    it('should create an logger with listener', () => {
        const silentListenerLogger = silentModuleLogger.listener('onTest')
        silentListenerLogger.log('Hello');
        assert.equal(silentListenerLogger.history.length, 1)
        assert.equal(silentListenerLogger.history[0], "[\u001b[90m2023-07-29T01:38:00.482Z\u001b[39m] module:\u001b[90mtest-module\u001b[39m | listener: \u001b[36monTest\u001b[39m \u001b[32mHello\u001b[39m")
    })
    it('should create an logger with method', () => {
        const silentMethodLogger = silentModuleLogger.method('test-method')
        silentMethodLogger.log('Hello');
        assert.equal(silentMethodLogger.history.length, 1)

        assert.equal(silentMethodLogger.history[0], '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[39m] module:\u001b[90mtest-module\u001b[39m | method: \u001b[33mtest-method\u001b[39m \u001b[32mHello\u001b[39m')
    })
    it('should handle level', function () {
        const levelLogger = new Logger({level: 'error'})
        levelLogger.error('Hello');
        assert.equal(levelLogger.history.length, 1)
        levelLogger.warn('Hello');
        assert.equal(levelLogger.history.length, 1)

        levelLogger.level = 'info'
        levelLogger.trace('Hello');
        assert.equal(levelLogger.history.length, 1)
    });

    it('should automatically beautify instead of [Object Object]', () => {
        const object = {
            x: 42,
            y: {
                b: [1, 2, 3]
            },
            req: 'getCar'
        }
        silentModuleLogger.log('Received from ws client', object)
        assert.equal(silentModuleLogger.history.length, 2)
        // If you change the styling of below it will assume spaces are part of the string
        assert.equal(silentModuleLogger.history[1], `[\u001b[90m2023-07-29T01:38:00.482Z\u001b[39m] module:\u001b[90mtest-module\u001b[39m \u001b[32mReceived from ws client\u001b[39m \u001b[32mObject(\u001b[39m\u001b[32m{\u001b[39m
\u001b[32m  "x": 42,\u001b[39m
\u001b[32m  "y": {\u001b[39m
\u001b[32m    "b": [\u001b[39m
\u001b[32m      1,\u001b[39m
\u001b[32m      2,\u001b[39m
\u001b[32m      3\u001b[39m
\u001b[32m    ]\u001b[39m
\u001b[32m  },\u001b[39m
\u001b[32m  "req": "getCar"\u001b[39m
\u001b[32m}\u001b[39m \u001b[32m)\u001b[39m`)
    });
})
