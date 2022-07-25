import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import MapView, {MapEvent, Marker} from "react-native-maps";
import colors from "../constans/colors";
import {MapScreenProps, useAppNavigation} from "../navigation/types";
import {LocationType} from "../hooks/useLocation";
import {AppText} from "../components/AppText";
import {useAppDispatch} from "../store/store";
import {addCallbackAC} from "../store/mapReducer";


export const MapScreen = ({route}: MapScreenProps) => {
    const [location, setLocation] = useState<LocationType>({} as LocationType);
    const {latitude, longitude} = route.params
    const dispatch = useAppDispatch()
    const navigation = useAppNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: "white",
            headerRight: () => (
                <Pressable onPress={locationSaveHandler}><AppText
                    style={{color: "white", fontWeight: "bold", fontSize: 18}}>Save</AppText></Pressable>
            ),
        });
    }, [navigation, location]);

    useEffect(()=> {
        setLocation({latitude:latitude, longitude:longitude})
    },[])

    const mapRegion = {
        latitude: location.latitude ? location.latitude : latitude,
        longitude: location.longitude ? location.longitude : longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0422
    }

    const locationSaveHandler = () => {
        dispatch(addCallbackAC({value: location}))
        navigation.goBack()
    }


    const mapPressHandler = (event: MapEvent) => {
        setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        })
    }

    let markerCoords
    if (Object.keys(location).length > 0) {
        markerCoords = {
            latitude: location.latitude,
            longitude: location.longitude
        }
    }

    return (
        <>
            <MapView style={styles.container} region={mapRegion} onPress={mapPressHandler}>
                {markerCoords && <Marker title={"Picked Location"} coordinate={markerCoords}/>}
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        marginVertical: 15
    }
});
