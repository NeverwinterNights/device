import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {PlaceDetailScreenProps, useAppNavigation} from "../navigation/types";
import colors from "../constans/colors";
import {AppText} from "../components/AppText";
import MapView, {Marker} from "react-native-maps";


export const PlaceDetailScreen = ({route}: PlaceDetailScreenProps) => {
    const {title, id, url, location} = route.params
    const navigation = useAppNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerTitle: title,
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: "white",
        });
    }, [navigation, title, id]);

    const mapRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0422
    }

    const markerCoords = {
        latitude: location.latitude,
        longitude: location.longitude,
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: url}}/>
            </View>
            <AppText style={styles.text}>{title}</AppText>
            <View style={styles.mapContainer}>
                <MapView style={styles.mapView} region={mapRegion}>
                     <Marker title={"place Location"} coordinate={markerCoords}/>
                </MapView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    imageContainer: {
        marginBottom: 10,
        width: "100%",
        height: 250,
        borderColor: "#ccc",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
    mapContainer: {
        marginBottom: 10,
        width: "100%",
        height: 350,
        borderColor: "#ccc",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mapView:{
        width:"100%",
        height:"100%",
    }
});
