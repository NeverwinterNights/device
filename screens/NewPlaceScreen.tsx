import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {AppText} from "../components/AppText";
import colors from "../constans/colors";
import {useAppNavigation} from "../navigation/types";
import {useAppDispatch, useAppSelector} from "../store/store";
import {ImageSelector} from "../components/ImageSelector";
import {useLocation} from "../hooks/useLocation";
import {addPlaceTh} from "../store/placeReducer";
import {addCallbackAC} from "../store/mapReducer";
import MapView, {Marker} from "react-native-maps";


type NewPlaceScreenPropsType = {}

export type LocationType = {
    latitude: number
    longitude: number

}

type DataType = {
    title: string
    urlImage: string
    location: LocationType
}

export const NewPlaceScreen = ({}: NewPlaceScreenPropsType) => {
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const location = useLocation()

    const [data, setData] = useState<DataType>({} as DataType);
    const locationFromMap: LocationType | null = useAppSelector(state => state.mapReducer.location)

    useEffect(() => {
        if (locationFromMap) {
            setData({...data, location: {latitude: locationFromMap.latitude, longitude: locationFromMap.longitude}})
        }
        dispatch(addCallbackAC({value: null}))
    }, [locationFromMap])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Add Place",
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: "white",
        });
    }, [navigation]);

    const savePlace = () => {
        dispatch(addPlaceTh({title: data.title, image: data.urlImage, location: data.location}))
        setData({} as DataType)
        navigation.goBack()
    }

    const onImageTaken = (uri: string) => {
        setData({...data, urlImage: uri})
    }


    const locationHandler = async () => {
        navigation.navigate("MapScreen", {
            latitude: !!data.location ? data.location.latitude : location.latitude,
            longitude: !!data.location ? data.location.longitude : location.longitude,
        })
    }


    let mapRegion
    if (!!data.location) {
        mapRegion = {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0422
        }
    }

    let markerCoords
    if (!!data.location) {
        markerCoords = {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            // latitude: 37.350146730246614,
            // longitude: -122.07855630666018

        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <AppText style={styles.text}>Title</AppText>
            <TextInput value={data.title} onChangeText={(text) => setData({...data, title: text})}
                       style={styles.input}/>
            <ImageSelector onImageTaken={onImageTaken}/>

            <View style={styles.preview}>
                {data.location
                    ?
                    <MapView style={styles.map} region={mapRegion}>
                       {markerCoords && <Marker title={"Picked Location"} coordinate={markerCoords}/>}
                    </MapView>
                    :
                    <AppText>No location chose</AppText>}
            </View>
            <View style={styles.buttons}>
                <Button title={"Add Location"} color={colors.primary}
                        onPress={() => setData({...data, location: location})}/>
                <Button title={"Pick on map"} color={colors.primary} onPress={locationHandler}/>
            </View>
            {/*<LocationComponent getLocation={getLocation}/>*/}

            <Button disabled={Object.keys(data).length !== 3} title={"Add New City"} color={colors.primary}
                    onPress={savePlace}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    },
    preview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        marginBottom: 15,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 15,
        paddingHorizontal: 2,
        paddingVertical: 4
    },
});
