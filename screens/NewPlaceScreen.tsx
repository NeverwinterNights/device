import React, {useLayoutEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, TextInput} from 'react-native';
import {AppText} from "../components/AppText";
import colors from "../constans/colors";
import {useAppNavigation} from "../navigation/types";
import {useAppDispatch} from "../store/store";
import {addPlaceAC} from "../store/placeReducer";
import {ImageSelector} from "../components/ImageSelector";

type NewPlaceScreenPropsType = {}

export const NewPlaceScreen = ({}: NewPlaceScreenPropsType) => {
    const navigation = useAppNavigation()
    const [valueInput, setValueInput] = useState("");
    const dispatch = useAppDispatch()


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Add Place",
            headerTitleAlign: "center",
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: "white",
            // headerRight: () => (
            //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            //         <Item title="Add Place" iconName="md-add" onPress={() => navigation.navigate("NewPlaceScreen")} />
            //     </HeaderButtons>
            // ),


        });
    }, [navigation]);

    const savePlace = () => {
        dispatch(addPlaceAC({title:valueInput}))
        setValueInput("")
        navigation.goBack()
    }


    return (
        <ScrollView style={styles.container}>
            <AppText style={styles.text}>Title</AppText>
            <TextInput value={valueInput} onChangeText={(text)=> setValueInput(text)} style={styles.input}/>
            <ImageSelector/>
            <Button title={"Add New City"} color={colors.primary} onPress={savePlace}/>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 30,

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