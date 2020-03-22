# Type-safe and generic implementation of the build pattern in Typescript
## How to use it
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

## Implementation of Validatable interface
Implement the Validatable interface if you want to run validations **before** the builder creates the object.
