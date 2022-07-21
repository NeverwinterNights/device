import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MapScreen} from "../screens/MapScreen";
import {NewPlaceScreen} from "../screens/NewPlaceScreen";
import {PlaceListScreen} from "../screens/PlaceListScreen";
import {PlaceDetailScreen} from "../screens/PlaceDetailScreen";
import colors from "../constans/colors";


const Stack = createNativeStackNavigator();


export const PlaceNavigator = () => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: "white",
        headerTitleAlign: "center"
    }}>
        <Stack.Screen options={{headerTitle:"All Places"}} name="PlaceListScreen" component={PlaceListScreen}/>
        <Stack.Screen name="MapScreen" component={MapScreen}/>
        <Stack.Screen name="NewPlaceScreen" component={NewPlaceScreen}/>
        <Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen}/>
    </Stack.Navigator>
)