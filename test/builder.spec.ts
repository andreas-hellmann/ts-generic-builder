import { Builder, DomainBuilder } from '../src/builder';
import { Person, PersonVo } from './person';
import { Place } from './place';

describe('Builder test', function () {
    const expectedResult: Person = {
        title: 'Mister',
        firstname: 'Magne',
        surname: 'Thor',
        birthday: new Date('2000-01-11'),
        validate: () => true,
    };

    const expectedResultPlace: Place = {
        gpsLongitude: '7.785300',
        gpsLatitude: '51.984371',
    };

    it('Correct full Person', function () {
        const result: Person = new Builder(Person)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .with({ title: expectedResult.title! })
            .with({ firstname: expectedResult.firstname })
            .with({ surname: expectedResult.surname })
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .with({ birthday: expectedResult.birthday! })
            .build();

        expect(result.title).toBe(expectedResult.title);
        expect(result.firstname).toBe(expectedResult.firstname);
        expect(result.surname).toBe(expectedResult.surname);
        expect(result.birthday).toBe(expectedResult.birthday);
    });

    it('Correct minimal Person', function () {
        const result: Person = new Builder(Person)
            .with({ firstname: expectedResult.firstname })
            .with({ surname: expectedResult.surname })
            .build();

        expect(result.title).toBeUndefined();
        expect(result.firstname).toBe(expectedResult.firstname);
        expect(result.surname).toBe(expectedResult.surname);
        expect(result.birthday).toBeUndefined();
    });

    it('Validation failed Person', function () {
        const builder: Builder<Person> & Person = new Builder(Person)
            .with({ firstname: '' })
            .with({ surname: expectedResult.surname });
        expect(builder.build.bind(builder)).toThrowError('Object of type Person could not be validated.');
    });

    it('Correct minimal PersonVo', function () {
        const result: PersonVo = new DomainBuilder(PersonVo)
            .with({ firstname: expectedResult.firstname })
            .with({ surname: expectedResult.surname })
            .build();

        expect(result.title).toBeUndefined();
        expect(result.firstname).toBe(expectedResult.firstname);
        expect(result.surname).toBe(expectedResult.surname);
        expect(result.birthday).toBeUndefined();

        const newName = 'Meier';
        result.changeSurname(newName);
        expect(result.surname).toBe(newName);
    });

    it('Correct full Place', function () {
        const result: Place = new Builder(Place)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .with({ gpsLongitude: expectedResultPlace.gpsLongitude! })
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .with({ gpsLatitude: expectedResultPlace.gpsLatitude! })
            .build();

        expect(result.gpsLongitude).toBe(expectedResultPlace.gpsLongitude);
        expect(result.gpsLatitude).toBe(expectedResultPlace.gpsLatitude);
    });

    it('Correct minimal Place', function () {
        const result: Place = new Builder(Place).build();

        expect(result.gpsLongitude).toBeUndefined();
        expect(result.gpsLatitude).toBeUndefined();
    });
});
