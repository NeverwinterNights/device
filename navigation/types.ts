import {NavigationProp, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {LocationType} from "../screens/NewPlaceScreen";

export type RootStackParamList = {
    PlaceListScreen: undefined
    NewPlaceScreen: undefined
    PlaceDetailScreen: { title: string, id: string, url:string,location: LocationType}
    MapScreen: { latitude: number, longitude: number}
}


export type NavigationType = NavigationProp<RootStackParamList>
export const useAppNavigation = () => useNavigation<NavigationType>()


export type PlaceDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PlaceDetailScreen'>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, 'MapScreen'>;