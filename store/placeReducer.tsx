import {createAction, createSlice} from "@reduxjs/toolkit";
import {Place, PlaceType} from "../models/place";


type initialStateType = {
    places: PlaceType[]
}


const initialState: initialStateType = {
    places: [] as PlaceType[]
}


export const addPlaceAC = createAction<{ title: string }>("place/addPlaceAC")


const slice = createSlice({
    name: "place",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPlaceAC, (state, action) => {
                state.places = [...state.places, new Place(new Date().toString(), action.payload.title)]
            })
    },
})


export const placeReducer = slice.reducer


