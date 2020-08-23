import { Person, PersonVo } from './person';
import { Place } from './place';
import { Builder, DomainBuilder } from '../src/builder';

// Correct
const correct: Person = new Builder(Person)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();

/**
 * Correct Domain Driven Design Builder
 * - all properties can be private
 * - all properties are readonly
 * - manipulation of the object PersonVo through well-defined methods (e.g. changeSurname)
 * - no need to implement method changeSurname(newName: string)
 */
const correctVo: PersonVo = new DomainBuilder(PersonVo)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();

// Correct Property Access
const firstname: string = new Builder(Person)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') }).firstname;

const birthday: Date | undefined = new Builder(Person)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') }).birthday;

// Correct
const telgte: Place = new Builder(Place)
    .with({ gpsLongitude: '7.785300' })
    .with({ gpsLatitude: '51.984371' })
    .build();

// Correct - because gpsLongitude may be undefined
const nowhere: Place = new Builder(Place).with({ gpsLongitude: undefined }).build();

// Fail - firstname missing
const fail: Person = new Builder(Person)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();

// Fail - firstname missing
/*
const fail: Person = new Builder(Person)
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();
*/

// Fail - property degree does not exist
/*
const fail: Person = new Builder(Person)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ degree: 'Mister' })
    .with({ birthday: new Date('2000-01-11') })
    .build();
*/

/** Improper usage, because:
 *  - PersonVo contains methods which needs to be implemented
 *  - PersonVo contains private properties which cannot be defined
 *
 *   Proper usage would use DomainBuilder
 */
/**

const correctVoFail: PersonVo = new Builder(PersonVo)
    .with({ firstname: 'Magne' })
    .with({ surname: 'Thor' })
    .with({ birthday: new Date('2000-01-11') })
    .build();
*/
