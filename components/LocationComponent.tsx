import React, {useState} from 'react';
import {ActivityIndicator, Alert, Button, StyleSheet, View} from 'react-native';
import {AppText} from "./AppText";
import colors from "../constans/colors";
import * as Location from "expo-location";

export const LocationComponent = () => {

    const [location, setLocation] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    console.log(isFetching);
    const getLocationHandler = async () => {
        setIsFetching(true)
        try {
            const {granted} = await Location.requestForegroundPermissionsAsync()
            if (!granted) return
            const {coords: {longitude, latitude}}: Location.LocationObject = await Location.getCurrentPositionAsync()
            setLocation({latitude, longitude})
        } catch (error) {
            Alert.alert("Error with getting location", error);
        }
        setIsFetching(false)
    }
    console.log(location);

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {isFetching ? <ActivityIndicator size={"large"} color={colors.primary}/> :
                    <AppText>No location chose</AppText>}
            </View>
            <Button title={"Add Location"} color={colors.primary} onPress={getLocationHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
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
});
