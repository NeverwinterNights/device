import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import colors from "../constans/colors";
import {useAppNavigation} from "../navigation/types";
import {CustomHeaderButton} from "../components/CustomHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useAppDispatch, useAppSelector} from "../store/store";
import {PlaceItem} from "../components/PlaceItem";
import {fetchPlacesTh} from "../store/placeReducer";

type PlaceListScreenPropsType = {}

export const PlaceListScreen = ({}: PlaceListScreenPropsType) => {
    const places = useAppSelector(state => state.placeReducer.places)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPlacesTh())
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: "white",
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Add Place" iconName="md-add" onPress={() => navigation.navigate("NewPlaceScreen")}/>
                </HeaderButtons>
            ),


        });
    }, [navigation]);


    return (
        <FlatList data={places} keyExtractor={(item) => item.id} renderItem={({item}) =>
            <PlaceItem address={"j"} title={item.title} image={item.imageUrl}
                       onSelect={() => navigation.navigate("PlaceDetailScreen", {title: item.title, id: item.id})}/>
        }/>
    );
};

const styles = StyleSheet.create({
    container: {}
});
