export interface Validatable {
    validate(): boolean;
}

export class Builder<T> implements Validatable {
    constructor(private creator: new (t: Builder<T> & T) => T) {}

    with<K extends keyof T>(obj: Pick<T, K>): this & Pick<T, K> {
        return Object.assign(this, obj);
    }

    validate(): boolean {
        if ('validate' in this.creator.prototype) {
            return this.creator.prototype.validate.bind(this).apply();
        }

        return true;
    }

    build(this: this & T): T {
        if (this.validate()) {
            return new this.creator(this);
        }

        throw new Error(`Object of type ${this.creator.name} could not be validated.`);
    }
}
