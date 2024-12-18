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
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] \u001b[32mHello\u001b[0m'
        assert.equal(silentLogger.history[0], expected)
    })
    it('should create an logger with module', () => {
        silentModuleLogger = silentLogger.module('test-module')
        silentModuleLogger.log('Hello');
        assert.equal(silentModuleLogger.history.length, 1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m \u001b[32mHello\u001b[0m'
        assert.equal(silentModuleLogger.history[0], expected)
    })
    it('should create an logger with context', () => {
        const silentContextLogger = silentModuleLogger.context('test-context')
        silentContextLogger.log('Hello');
        assert.equal(silentContextLogger.history.length, 1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] context: \u001b[94mtest-context\u001b[0m | module:\u001b[90mtest-module\u001b[0m \u001b[32mHello\u001b[0m'
        assert.equal(silentContextLogger.history[0], expected)
    })
    it('should create an logger with listener', () => {
        const silentListenerLogger = silentModuleLogger.listener('onTest')
        silentListenerLogger.log('Hello');
        assert.equal(silentListenerLogger.history.length, 1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m | listener: \u001b[36monTest\u001b[0m \u001b[32mHello\u001b[0m'
        assert.equal(silentListenerLogger.history[0], expected)
    })
    it('should create an logger with method', () => {
        const silentMethodLogger = silentModuleLogger.method('test-method')
        silentMethodLogger.log('Hello');
        assert.equal(silentMethodLogger.history.length, 1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m | method: \u001b[33mtest-method\u001b[0m \u001b[32mHello\u001b[0m'
        assert.equal(silentMethodLogger.history[0], expected)
    })
    it('should handle level', function () {
        const levelLogger = new Logger({level: 'error'})
        levelLogger._log = () => {}
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
        const expected =  `[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m \u001b[32mReceived from ws client\u001b[0m \u001b[32mObject(\u001b[0m\u001b[32m{\n  \"x\": 42,\n  \"y\": {\n    \"b\": [\n      1,\n      2,\n      3\n    ]\n  },\n  \"req\": \"getCar\"\n}\u001b[0m\u001b[32m)\u001b[0m`;
        assert.equal(silentModuleLogger.history[1], expected)
    });
})
