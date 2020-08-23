export interface Validatable {
    validate(): boolean;
}

export class DomainBuilder<T, C extends T> implements Validatable {
    constructor(private creator: new (t: DomainBuilder<T, C> & T) => C) {}

    with<K extends keyof T>(obj: Pick<T, K>): this & Pick<T, K> {
        return Object.assign(this, obj);
    }

    validate(): boolean {
        if ('validate' in this.creator.prototype) {
            return this.creator.prototype.validate.bind(this).apply();
        }

        return true;
    }

    build(this: this & T): C {
        if (this.validate()) {
            return new this.creator(this);
        }

        throw new Error(`Object of type ${this.creator.name} could not be validated.`);
    }
}

export class Builder<T> extends DomainBuilder<T, T> {}
