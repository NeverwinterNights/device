import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {PlaceDetailScreenProps, useAppNavigation} from "../navigation/types";
import colors from "../constans/colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../components/CustomHeaderButton";


export const PlaceDetailScreen = ({route}: PlaceDetailScreenProps) => {
    const {title, id} = route.params
    const navigation = useAppNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerTitle:title,
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: "white",
        });
    }, [navigation, title, id]);

    return (
        <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});
