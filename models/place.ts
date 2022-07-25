import {LocationType} from "../screens/NewPlaceScreen";

export type PlaceType = {
    id: string
    title: string
    imageUrl: string
    location: LocationType
}

export class Place {
    constructor(public id: string, public title: string, public imageUrl: string, public location: LocationType) {
    }
}