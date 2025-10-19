import {describe, expect, it} from '@scintilla-network/litest'
import Logger from "./Logger.js";

describe('Logger', () => {
    let silentLogger
    let silentModuleLogger
    it('should create an logger', () => {
        silentLogger = new Logger({date:new Date('2023-07-29T01:38:00.482Z'), historyLimit: 100});
        silentLogger._log = () => {}
        expect(silentLogger.history.length).toBe(0)
        silentLogger.log('Hello');
        expect(silentLogger.history.length).toBe(1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] - \u001b[32mHello\u001b[0m'
        expect(silentLogger.history[0]).toBe(expected)
    })
    it('should create an logger with module', () => {
        silentModuleLogger = silentLogger.module('test-module')
        silentModuleLogger.log('Hello');
        expect(silentModuleLogger.history.length).toBe(1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m - \u001b[32mHello\u001b[0m'
        expect(silentModuleLogger.history[0]).toBe(expected)
    })
    it('should create an logger with context', () => {
        const silentContextLogger = silentModuleLogger.context('test-context')
        silentContextLogger.log('Hello');
        expect(silentContextLogger.history.length).toBe(1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] context: \u001b[94mtest-context\u001b[0m | module:\u001b[90mtest-module\u001b[0m - \u001b[32mHello\u001b[0m'
        expect(silentContextLogger.history[0]).toBe(expected)
    })
    it('should create an logger with listener', () => {
        const silentListenerLogger = silentModuleLogger.listener('onTest')
        silentListenerLogger.log('Hello');
        expect(silentListenerLogger.history.length).toBe(1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m | listener: \u001b[36monTest\u001b[0m - \u001b[32mHello\u001b[0m'
        expect(silentListenerLogger.history[0]).toBe(expected)
    })
    it('should create an logger with method', () => {
        const silentMethodLogger = silentModuleLogger.method('test-method')
        silentMethodLogger.log('Hello');
        expect(silentMethodLogger.history.length).toBe(1)
        const expected = '[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m | method: \u001b[33mtest-method\u001b[0m - \u001b[32mHello\u001b[0m'
        expect(silentMethodLogger.history[0]).toBe(expected)
    })
    it('should handle level', function () {
        const levelLogger = new Logger({level: 'error', historyLimit: 100});
        levelLogger._log = () => {}
        levelLogger.error('Hello');
        expect(levelLogger.history.length).toBe(1)
        levelLogger.warn('Hello');
        expect(levelLogger.history.length).toBe(1)

        levelLogger.level = 'info'
        levelLogger.trace('Hello');
        expect(levelLogger.history.length).toBe(1)
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
        expect(silentModuleLogger.history.length).toBe(2)
        const expected =  `[\u001b[90m2023-07-29T01:38:00.482Z\u001b[0m] module:\u001b[90mtest-module\u001b[0m - \u001b[32mReceived from ws client\u001b[0m \u001b[32mObject(\u001b[0m\u001b[32m{\n  \"x\": 42,\n  \"y\": {\n    \"b\": [\n      1,\n      2,\n      3\n    ]\n  },\n  \"req\": \"getCar\"\n}\u001b[0m\u001b[32m)\u001b[0m`;
        expect(silentModuleLogger.history[1]).toBe(expected)
    });

    it('should transmit history config to child loggers', () => {
        const parentLogger = new Logger({date:new Date('2023-07-29T01:38:00.482Z'), historyLimit: 123});
        parentLogger._log = () => {}
        parentLogger.log('hello');
        expect(parentLogger.historyLimit).toBe(123)
        expect(parentLogger.history.length).toBe(1)

        const childLogger = parentLogger.listener('onTest')
        expect(childLogger.historyLimit).toBe(123)
        expect(childLogger.history.length).toBe(0)
        childLogger.log('Hello');
        expect(childLogger.history.length).toBe(1)
    })
})
