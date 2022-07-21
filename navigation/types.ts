import {NavigationProp, useNavigation} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    PlaceListScreen: undefined
    MapScreen: undefined
    NewPlaceScreen: undefined
    PlaceDetailScreen: {title:string, id:string}
}


export type NavigationType = NavigationProp<RootStackParamList>
export const useAppNavigation = () => useNavigation<NavigationType>()



export type PlaceDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PlaceDetailScreen'>;