export class ArtworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ArtworkError';
    }
}
