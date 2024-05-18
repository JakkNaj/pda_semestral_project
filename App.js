import React, { useEffect } from "react";
import { useFonts } from 'expo-font';
import AppNavigator from './src/router/AppNavigator.js'
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider, useDispatch, useSelector} from "react-redux";
import Toast from 'react-native-toast-message';
import {store} from "./src/api/store";
import { View } from "react-native";
import {getSettingsFromStorage, loadSettings} from "./src/components/Settings/actions";
import {getExercises} from "./src/components/Exercises/actions";
import {exercisesSelector} from "./src/components/Exercises/reducer";
import {getHistoryFromStorage, getTrainingsFromStorage} from "./src/components/Trainings/actions";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as Notifications from "expo-notifications";
if (__DEV__) {
    require("./ReactotronConfig");
}

const AppContent = () => {
    const dispatch = useDispatch();

    const exercisesData = useSelector(exercisesSelector)

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
        }),
    });

    useEffect(() => {
        dispatch(getSettingsFromStorage());
        dispatch(getExercises());
        dispatch(getTrainingsFromStorage());
        dispatch(getHistoryFromStorage());
    }, [dispatch]);

    let [fontsLoaded] = useFonts({
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        // include other font styles if needed
    });

    const isDataLoaded = !!(fontsLoaded && exercisesData.length > 0)

    return isDataLoaded
        ? <AppNavigator />
        : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("./assets/loading-animation.json")}
                style={{width: 150, height: 150}}
                autoPlay
                loop
            />
        </View>
};

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer
                    theme={MyTheme}
                >
                    <AppContent />
                    <Toast />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}