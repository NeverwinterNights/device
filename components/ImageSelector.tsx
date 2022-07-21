import React from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {AppText} from "./AppText";
import colors from "../constans/colors";
import * as ImagePicker from 'expo-image-picker';

type ImageSelectorPropsType = {}

export const ImageSelector = ({}: ImageSelectorPropsType) => {

    const imageHandler = () => {
        ImagePicker.launchCameraAsync()
    }
    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                <AppText>No image yet!</AppText>
                <Image style={styles.image} source={""}/>
            </View>
            <Button title={"Take Image"} color={colors.primary} onPress={imageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    imagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
