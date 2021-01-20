
import { LambdaLog } from 'lambda-log';

const localLogger = new LambdaLog({ debug: false });

export interface Logger {
    setDebug(debug: boolean): void;
    addSharedTag(tag: string): void;
    setMetadata(key: string, value: object | string): void;
    error(msg: string | Error | Object, meta: object, tags: string[]): string;
    warn(msg: string | Error | Object, meta: object, tags: string[]): string;
    info(msg: string | Error | Object, meta: object, tags: string[]): string;
    debug(msg: string | Error | Object, meta: object, tags: string[]): string;
}

class DefaultLogger implements Logger {
    private readonly delegateLogger: LambdaLog;

    constructor(delegateLogger: LambdaLog) {
        this.delegateLogger = delegateLogger;
    }

    setDebug(debug: boolean) {
        this.delegateLogger.options.debug = debug;
    }

    addSharedTag(tag: string) {
        this.delegateLogger!.options!.tags!.push(tag);
    }

    setMetadata(key: string, value: object | string) {
        this.delegateLogger.options!.meta[key] = value;
    }

    debug(msg: string | Error | Object, meta: object = {}, tags: string[] = []): string {
        // @ts-ignore msg can be also Err                             or
        return this.delegateLogger.log('debug', msg, meta, tags);
    }

    error(msg: string | Error | Object, meta: object = {}, tags: string[] = []): string {
        // @ts-ignore msg can be also Error
        return this.delegateLogger.log('error', msg, meta, tags);
    }

    info(msg: string | Error | Object, meta: object = {}, tags: string[] = []): string {
        // @ts-ignore msg can be also Error
        return this.delegateLogger.log('info', msg, meta, tags);
    }

    warn(msg: string | Error | Object, meta: object = {}, tags: string[] = []): string {
        // @ts-ignore msg can be also Error
        return this.delegateLogger.log('warn', msg, meta, tags);
    }

}

export default new DefaultLogger(localLogger);
