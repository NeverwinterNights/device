import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Place, PlaceType} from "../models/place";
import * as FileSystem from 'expo-file-system';
import {Alert} from "react-native";
import {fetchPlaces, insertPlace} from "../utils/db";
import {SQLResultSetRowList} from "expo-sqlite/src/SQLite.types";
import {SQLResultSet} from "expo-sqlite";
import {LocationType} from "../screens/NewPlaceScreen";


type initialStateType = {
    places: PlaceType[]
}

export type DBResponseType = {
    insertId: number,
    rows: SQLResultSetRowList,
    rowsAffected: number,
}


const initialState: initialStateType = {
    places: [] as PlaceType[]
}


export const addPlaceAC = createAction<{ id: number, title: string, image: string, location: LocationType }>("place/addPlaceAC")
export const fetchPlacesAC = createAction<{ places: PlaceType[] }>("place/fetchPlacesAC")


export const addPlaceTh = createAsyncThunk("place/addPlaceTh", async (param: { title: string, image: string, location: LocationType }, {
    dispatch,
    rejectWithValue
}) => {
    const fileName = param.image.split("/").pop()
    if (!fileName) {
        return
    }

    const path = FileSystem.documentDirectory + fileName
    try {
        await FileSystem.moveAsync({
            from: param.image,
            to: path
        })
        const result: SQLResultSet = await insertPlace(param.title, path, "fake address", param.location.latitude, param.location.longitude)
        if (!result.insertId) {
            return
        }
        dispatch(addPlaceAC({id: result.insertId, title: param.title, image: path, location: param.location}))
        return {id: result.insertId, title: param.title, image: path, location: param.location}
    } catch (error) {
        Alert.alert("Error saving file", error)
    }
    // return {title: param.title, image: path}

})

export const fetchPlacesTh = createAsyncThunk("place/fetchPlacesTh", async (param, {
    dispatch,
    rejectWithValue
}) => {
    try {
        const dbResults = await fetchPlaces()
        dispatch(fetchPlacesAC({places: dbResults.rows._array}))
        return dbResults.rows._array
    } catch (error) {
        Alert.alert("Error fetching places", error)
    }
})

const slice = createSlice({
    name: "place",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPlaceTh.fulfilled, (state, action) => {
                if (action.payload && action.payload.title && action.payload.image) {
                    state.places = [...state.places, new Place(String(action.payload.id), action.payload.title, action.payload.image, action.payload.location)]
                }
            })
            .addCase(fetchPlacesTh.fulfilled, (state, action) => {
                if (action.payload) {
                    state.places = action.payload.map((place) => new Place(place.id.toString(), place.title, place.imageUri, {
                        latitude: place.lat,
                        longitude: place.lng
                    }))
                }
            })
    },
})


export const placeReducer = slice.reducer


