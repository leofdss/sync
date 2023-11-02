import { RedisClientType, createClient } from 'redis';
import { Observable, catchError, defer, map, throwError } from 'rxjs';
import { AppError } from './error';

export class Redis {
    private readonly _client: RedisClientType;

    constructor() {
        this._client = createClient();
        this.logs();
    }

    private logs(): void {
        this._client.on('error', (err) =>
            console.log('Redis Client Error', err),
        );
    }

    connect(): Observable<void> {
        return defer(async () => {
            await this._client.connect();
        }).pipe(
            map(() => void 0),
            catchError((error: unknown) => {
                return throwError(() => {
                    return new AppError('Redis Client Error', error);
                });
            }),
        );
    }
}
