import { Builder, Validatable } from '../src/builder';

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
