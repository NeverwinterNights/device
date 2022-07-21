export type PlaceType = {
    id: string
    title: string
}

export class Place {
    constructor(public id: string, public title: string) {
    }
}