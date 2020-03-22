import { Builder } from '../src/builder';
import { Person } from './person';
import { Place } from './place';

// Correct
const correct: Person = new Builder(Person)
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

// Correct
const telgte: Place = new Builder(Place)
    .with({ gpsLongitude: '7.785300' })
    .with({ gpsLatitude: '51.984371' })
    .build();

// Correct - because gpsLongitude may be unefined
const nowhere: Place = new Builder(Place).with({ gpsLongitude: undefined }).build();
