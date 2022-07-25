import {createAction, createSlice} from "@reduxjs/toolkit";
import {LocationType} from "../screens/NewPlaceScreen";


type initialStateType = {
    location:LocationType | null
}


const initialState: initialStateType = {
    location: null
}


export const addCallbackAC = createAction<{ value: null | LocationType }>("map/addCallbackAC")


const slice = createSlice({
    name: "map",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCallbackAC, (state, action) => {
                 state.location = action.payload.value
            })
    },
})


export const mapReducer = slice.reducer


