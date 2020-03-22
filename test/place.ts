import { Builder } from '../src/builder';

export class Place {
    public readonly gpsLongitude?: string;
    public readonly gpsLatitude?: string;

    constructor(builder: Builder<Place> & Place) {
        this.gpsLongitude = builder.gpsLongitude;
        this.gpsLatitude = builder.gpsLatitude;
    }
}
