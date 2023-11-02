export class AppError extends Error {
    constructor(
        public message: string,
        public raw: unknown,
    ) {
        super(message);
    }
}
