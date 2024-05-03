import React, { useEffect } from "react";
import { useFonts } from 'expo-font';
import AppNavigator from './src/router/AppNavigator.js'
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider, useDispatch, useSelector} from "react-redux";
import Toast from 'react-native-toast-message';
import {store} from "./src/api/store";
import { Text, View } from "react-native";
import { loadSettings } from "./src/components/Settings/actions";
import {getExercises} from "./src/components/Exercises/actions";
import {exercisesSelector} from "./src/components/Exercises/reducer";
import {getTrainingsFromStorage} from "./src/components/Trainings/actions";
if (__DEV__) {
    require("./ReactotronConfig");
}

const AppContent = () => {
    const dispatch = useDispatch();

    const exercisesData = useSelector(exercisesSelector)

    useEffect(() => {
        dispatch(loadSettings());
        dispatch(getExercises());
        dispatch(getTrainingsFromStorage());
    }, [dispatch]);

    let [fontsLoaded] = useFonts({
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        // include other font styles if needed
    });

    const isDataLoaded = !!(fontsLoaded && exercisesData.length > 0)

    return isDataLoaded
        ? <AppNavigator />
        : <View>
            <Text>Loading...</Text>
        </View>
};

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppContent />
                <Toast />
            </SafeAreaProvider>
        </Provider>
    );
}