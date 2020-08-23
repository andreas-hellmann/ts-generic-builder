import { DomainBuilder, Validatable, Builder } from '../src/builder';

export class Person implements Validatable {
    public readonly title?: string;
    public readonly firstname: string;
    public readonly surname: string;
    public readonly birthday?: Date;

    constructor(builder: Builder<Person> & Person) {
        this.title = builder.title;
        this.firstname = builder.firstname;
        this.surname = builder.surname;
        this.birthday = builder.birthday;
    }

    validate(): boolean {
        let result = true;
        result = result && this.title != null ? this.title.trim().length > 0 : result;
        result = result && this.firstname.trim().length > 0;
        result = result && this.surname.trim().length > 0;
        result = result && this.birthday != null ? this.birthday < new Date() : result;

        return result;
    }
}

/**
 * Person implementation in Domain Driven Design context
 */
interface PersonProps extends Validatable {
    readonly title?: string;
    readonly firstname: string;
    readonly surname: string;
    readonly birthday?: Date;
}

export class PersonVo implements PersonProps {
    private _title?: string;
    private _firstname: string;
    private _surname: string;
    private _birthday?: Date;

    constructor(builder: DomainBuilder<PersonProps, PersonVo> & PersonProps) {
        this._title = builder.title;
        this._firstname = builder.firstname;
        this._surname = builder.surname;
        this._birthday = builder.birthday;
    }

    get title(): string | undefined {
        return this._title;
    }
    get firstname(): string {
        return this._firstname;
    }
    get surname(): string {
        return this._surname;
    }
    get birthday(): Date | undefined {
        return this._birthday;
    }

    validate(): boolean {
        let result = true;
        result = result && this.title != null ? this.title.trim().length > 0 : result;
        result = result && this.firstname.trim().length > 0;
        result = result && this.surname.trim().length > 0;
        result = result && this.birthday != null ? this.birthday < new Date() : result;

        return result;
    }

    public changeSurname(newName: string): void {
        this._surname = newName;
    }
}
