# Type-safe and generic implementation of the build pattern in Typescript
## How to use it
### Simple usage
* Conditions:
  * No methods in class
  * No need to keep properties private and controlling object manipulation

```ts
// Usage of the Builder
const person: Person = new Builder(Person)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();


// Optional implementation of the Validatable interface. Builder calls validate() *BEFORE* an object is build.
class Person implements Validatable {
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
        // Do your validation here
        return true;
    }
}
```

### Usage in the context of Domain Driven Design
* Use cases:
  * Model is implemented in domain driven fassion, that is class contains methods which are encapsulating business logic
  * Property access is kept private to enforce object manipulation through business logic methods


```ts
// Usage of the DomainBuilder
const correctVo: PersonVo = new DomainBuilder(PersonVo)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();

// Model definition
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
        // Do your validation here
        return true;
    }

    public changeSurname(newName: string): void {
        this._surname = newName;
    }
}
```

## Implementation of Validatable interface
Implement the Validatable interface if you want to run validations **before** the builder creates the object.
