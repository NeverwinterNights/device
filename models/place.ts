export type PlaceType = {
    id: string
    title: string
    imageUrl: string
}

export class Place {
    constructor(public id: string, public title: string, public imageUrl: string) {
    }
}