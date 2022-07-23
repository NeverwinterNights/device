import {StyleSheet} from 'react-native';
import {PlaceNavigator} from "./navigation/PlaceNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {init} from "./utils/db";


init().then(() => {
}).catch((err) => {
    console.log("Error in initialized DB", err);
})

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <PlaceNavigator/>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
