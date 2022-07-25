import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware from 'redux-thunk'
import {placeReducer} from "./placeReducer";
import {mapReducer} from "./mapReducer";


const rootReducer = combineReducers({
    placeReducer:placeReducer,
    mapReducer:mapReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: false,
        }
    ).prepend(thunkMiddleware)
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
