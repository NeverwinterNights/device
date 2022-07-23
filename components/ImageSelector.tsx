import React, {useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {AppText} from "./AppText";
import colors from "../constans/colors";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerResult} from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';

type ImageSelectorPropsType = {
    onImageTaken: (uri: string) => void
}

export const ImageSelector = ({onImageTaken}: ImageSelectorPropsType) => {
    const [pickedImage, setPickedImage] = useState("");

    // const addPermissions = async () => {
    //     const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY)
    //     if (result.status === "granted") {
    //         Alert.alert("No permissions for camera")
    //         return false
    //     }
    //     return true
    // }

    const imageHandler = async () => {
        // const permissionToCamera = await addPermissions()
        // if (!permissionToCamera) {
        //     return
        // }
        const image: ImagePickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })

        if (!image.cancelled) {
            setPickedImage(image.uri)
            onImageTaken(image.uri)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                {!pickedImage ? <AppText>No image yet!</AppText>
                    : <Image style={styles.image} source={{uri: pickedImage}}/>}
            </View>
            <Button title={"Take Image"} color={colors.primary} onPress={imageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 10
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
